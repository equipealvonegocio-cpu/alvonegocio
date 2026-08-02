-- ═══════════════════════════════════════════════════════════════
-- CADASTRO DE INTERESSADOS — EQUIPE ALVO NEGÓCIO
-- Esquema simples: a pessoa preenche os dados aqui, e você (admin)
-- olha os cadastros direto no painel do Supabase e decide manualmente
-- pra qual líder mandar. Nenhum dado fica visível publicamente.
--
-- CICLO DE VIDA DO LEAD (coluna "status"):
--   visitante → interessado → lead → lead_qualificado → parceiro → consultor → líder
-- O site preenche sozinho até "parceiro" (conforme a pessoa avança nos
-- formulários). Os dois últimos estágios ("consultor" e "líder") você
-- muda manualmente pelo Table Editor, quando confirmar o avanço real.
--
-- Como usar:
-- 1. Abra seu projeto em supabase.com → menu lateral → "SQL Editor"
-- 2. Cole este arquivo inteiro → "Run"
-- 3. Pronto: a tabela e as regras de acesso já ficam ativas
-- ═══════════════════════════════════════════════════════════════

create table leads (
  id                 uuid primary key default gen_random_uuid(),

  -- dados do formulário
  nome_completo      text not null,
  cpf                text,
  rg                 text,
  data_nascimento    date,
  genero             text,                            -- feminino / masculino / nao_informar
  telefone           text not null,
  email              text,
  endereco           text,
  cep                text,
  cidade             text,
  estado             text,

  -- controle
  origem             text,                            -- ex: instagram_ads, tiktok, organico, quiz
  interesse          text,                            -- renda / distribuidora / equipe / produtos
  status             text not null default 'lead'
                       check (status in (
                         'visitante',                  -- viu uma página, ainda não deixou dado nenhum (não gera linha aqui)
                         'interessado',                 -- demonstrou interesse mas não completou um formulário
                         'lead',                        -- preencheu um formulário básico (nome + whatsapp)
                         'lead_qualificado',             -- fez o quiz — já tem perfil e respostas de qualificação
                         'parceiro',                     -- completou o cadastro oficial (cpf/rg) na cadastro-completo.html
                         'consultor',                    -- você registrou manualmente na Jan Rosê e ela já está ativa vendendo
                         'lider',                        -- já construiu equipe e virou referência
                         'descartado'                    -- não seguiu adiante / contato sem sucesso
                       )),
  lider_escolhido    text,                             -- você preenche manualmente, depois de decidir
  criado_em          timestamptz not null default now(),

  -- dados do quiz de perfil (quiz.html)
  perfil_quiz        text,                            -- ex: "Líder em Desenvolvimento (91%)"
  respostas_quiz     jsonb                            -- todas as respostas do quiz, pra você analisar o perfil completo
);

-- se a tabela "leads" já existia antes do quiz (rode isso também, é seguro repetir):
alter table leads add column if not exists perfil_quiz text;
alter table leads add column if not exists respostas_quiz jsonb;

-- se a tabela "leads" já existia antes do ciclo de vida novo (rode isso também):
alter table leads alter column status set default 'lead';
alter table leads drop constraint if exists leads_status_check;
alter table leads add constraint leads_status_check check (status in (
  'visitante','interessado','lead','lead_qualificado','parceiro','consultor','lider','descartado'
));

-- ═══════════════════════════════════════════════════════════════
-- SEGURANÇA (Row Level Security)
-- O formulário público só pode INSERIR um cadastro novo.
-- Ninguém de fora consegue ler, alterar ou apagar nada.
-- Só você, logado como dono do projeto no painel do Supabase
-- (Table Editor), consegue ver e editar os cadastros.
-- ═══════════════════════════════════════════════════════════════
alter table leads enable row level security;

-- o site só pode inserir um lead nos 3 estágios que ele mesmo alcança sozinho:
-- "lead" (formulário básico), "lead_qualificado" (quiz) ou "parceiro" (cadastro completo).
-- Os estágios "consultor" e "líder" só existem quando VOCÊ atualiza manualmente
-- pelo painel do Supabase, depois de confirmar o avanço real da pessoa.
drop policy if exists "publico_pode_cadastrar" on leads;
create policy "publico_pode_cadastrar"
  on leads for insert
  to anon
  with check (status in ('lead','lead_qualificado','parceiro'));

-- (nenhuma policy de select/update/delete é criada para "anon" —
--  ou seja, ninguém de fora consegue ler os cadastros, só você
--  pelo painel do Supabase, que sempre tem acesso total como dono)
