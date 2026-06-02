/* ═══════════════════════════════════════════════════════
   Lia — Assistente Virtual Humanizada
   Equipe Alvo Negócio + Jan Rosê | v2.0
   Adicione no final do <body>: <script src="chatbot.js"></script>
═══════════════════════════════════════════════════════ */

(function() {

  /* ── CONFIGURAÇÃO ── */
  const CONFIG = {
    whatsapp: '5511915033743',
    atendente: 'Lia',
    empresa: 'Alvo Negócio',
    tempo_digitando: 1100,
    cor_principal: '#00FF38',
  };

  /* ════════════════════════════════════════
     FILA ROTATIVA DE DISTRIBUIDORES
     Substitua os dados fictícios pelos reais
  ════════════════════════════════════════ */
  const FILA = [
    { nome: 'Ismael Moraes', whats: '5511988189638', link: 'https://janrose.digital/consultor/ismaelmoraes' },
  ];

  function getFilaPos() {
    return parseInt(localStorage.getItem('an_fila_pos') || '0');
  }
  function getMembroAtual() {
    return FILA[getFilaPos() % FILA.length];
  }
  function avancarFila() {
    const pos = getFilaPos();
    localStorage.setItem('an_fila_pos', (pos + 1) % FILA.length);
  }

  /* ════════════════════════════════════════
     FLUXO DE CONVERSA — Lia
  ════════════════════════════════════════ */
  const FLUXO = {

    /* ── INÍCIO — pede o nome primeiro ── */
    inicio: {
      mensagem: `Olá 😊\n\nQue bom te ver por aqui!\n\nMeu nome é *Lia*, sou a assistente virtual da Equipe *Alvo Negócio* 💜✨\n\nEstou aqui para te ajudar, tirar dúvidas\n\nAntes de tudo… como posso te chamar?`,
      input: { tipo: 'text', placeholder: 'Digite seu nome...', proximo: 'boas_vindas', variavel: 'nome' }
    },

    /* ── BOAS-VINDAS COM O NOME ── */
    boas_vindas: {
      mensagem: `Que prazer te conhecer, *{nome}*! 😊\n\nFico feliz que você veio conversar comigo.\n\nSei que às vezes a gente chega com dúvidas, inseguranças ou sem saber exatamente o que esperar — e tudo bem. Estou aqui para te ajudar com calma, sem pressa 💜\n\nMe conta... o que te trouxe até aqui hoje?`,
      opcoes: [
        { texto: '💰 Quero uma renda extra',              proximo: 'renda_extra' },
        { texto: '🛍️ Quero conhecer os produtos',         proximo: 'produtos' },
        { texto: '📱 Quero aprender a vender',            proximo: 'vendas' },
        { texto: '👥 Quero montar uma equipe',            proximo: 'equipe' },
        { texto: '🌱 Quero crescer pessoalmente',         proximo: 'desenvolvimento' },
        { texto: '🔍 Só quero entender o projeto',        proximo: 'projeto' },
      ]
    },

    /* ── RENDA EXTRA ── */
    renda_extra: {
      mensagem: `Faz muito sentido, *{nome}* 😊\n\nMuita gente chega aqui buscando exatamente isso — uma forma de complementar a renda, trabalhar no próprio horário e sem depender de ninguém.\n\nA boa notícia é que aqui você começa *no seu ritmo*.\nSem pressão. Sem obrigações.\n\nVocê decide como quer crescer 💜\n\nQuer que eu te explique como funciona?`,
      opcoes: [
        { texto: '✅ Sim, quero entender melhor',       proximo: 'como_funciona' },
        { texto: '❓ Tenho uma dúvida antes',           proximo: 'duvidas_menu' },
        { texto: '😟 Já tentei coisas assim antes',     proximo: 'gatilho_experiencia_ruim' },
      ]
    },

    /* ── PRODUTOS ── */
    produtos: {
      mensagem: `Trabalhamos com produtos de:\n✔ perfumaria\n✔ cuidados com pele\n✔ maquiagem\n✔ cabelos\n✔ bem-estar\n✔ cuidados pessoais\n\nO mercado de beleza é um dos que *mais cresce no Brasil* e possui consumo recorrente, o que ajuda muito na fidelização de clientes 😊\n\nQual linha te desperta mais curiosidade?`,
      opcoes: [
        { texto: '✨ Beleza e cuidados com pele',   proximo: 'produto_beleza' },
        { texto: '🌸 Perfumaria',                   proximo: 'produto_perfume' },
        { texto: '💊 Saúde e bem-estar',            proximo: 'produto_saude' },
        { texto: '💇 Cuidados capilares',           proximo: 'produto_cabelo' },
      ]
    },

    produto_beleza: {
      mensagem: `Nossa linha de beleza tem *resultado real* ⭐\n\n🔥 *Kit Biorrejuvenescedor de Acácia* — viral com +10 milhões de views no TikTok!\n💆 *Sérum Vitamina C Derma Secrets* — clareamento e luminosidade\n🧴 *Lipocrem Antirrugas* — resultado visível em dias\n\nProdutos que *se vendem sozinhos* pela qualidade 😊`,
      opcoes: [
        { texto: '💰 Quero revender esses produtos', proximo: 'como_funciona' },
        { texto: '🛒 Quero comprar para mim',        proximo: 'convite_reuniao' },
        { texto: '🔙 Ver outras linhas',             proximo: 'produtos' },
      ]
    },

    produto_perfume: {
      mensagem: `Nossa perfumaria é o *carro-chefe* de vendas! 🌸\n\n👑 *Tríade Jan Rosê* — fragrância exclusiva, longa fixação e resultado comprovado.\n\nFemininos, masculinos e unissex.\nO presente que todo cliente *pede de novo*!\n\nPerfumaria é um dos produtos com *maior recompra* do catálogo 😊`,
      opcoes: [
        { texto: '💰 Quero revender e lucrar',      proximo: 'como_funciona' },
        { texto: '🛒 Quero comprar para mim',       proximo: 'convite_reuniao' },
        { texto: '🔙 Ver outras linhas',            proximo: 'produtos' },
      ]
    },

    produto_saude: {
      mensagem: `Nossa linha *Rennovit* cuida de dentro para fora 💊\n\n🧠 *RennoFocus* — foco e memória\n⚡ *RennoSlim* — emagrecimento saudável\n🥛 *Shake Rennovit* — nutrição completa\n🦴 *Colágeno Hidrolisado* — articulações e pele\n💊 *Imunovit* — imunidade\n\nProdutos de uso diário = cliente que *volta todo mês* 😊`,
      opcoes: [
        { texto: '💰 Quero revender esses produtos', proximo: 'como_funciona' },
        { texto: '🛒 Quero comprar para mim',        proximo: 'convite_reuniao' },
        { texto: '🔙 Ver outras linhas',             proximo: 'produtos' },
      ]
    },

    produto_cabelo: {
      mensagem: `Nossa linha capilar tem *muito resultado* 💇\n\n💪 *Forza Nano Fiber 10 em 1* — tratamento intensivo\n🥥 *Shampoo Argan + Coco* — hidratação profunda\n🌿 *Shampoo Aloe Vera + Jaborandi* — crescimento e força\n\nProdutos que as clientes *indicam para as amigas* sem você precisar pedir 😊`,
      opcoes: [
        { texto: '💰 Quero revender esses produtos', proximo: 'como_funciona' },
        { texto: '🛒 Quero comprar para mim',        proximo: 'convite_reuniao' },
        { texto: '🔙 Ver outras linhas',             proximo: 'produtos' },
      ]
    },

    /* ── VENDAS ── */
    vendas: {
      mensagem: `Hoje muitas pessoas trabalham usando:\n✔ WhatsApp\n✔ Instagram\n✔ Facebook\n✔ indicação\n✔ catálogo digital\n✔ atendimento presencial\n\nAlém disso, a Equipe Alvo Negócio oferece *suporte e treinamentos* para ajudar no desenvolvimento das vendas 🚀\n\nVocê já tem alguma experiência com vendas?`,
      opcoes: [
        { texto: 'Sim, já vendi antes',              proximo: 'vendas_experiente' },
        { texto: 'Não, sou iniciante',               proximo: 'vendas_iniciante' },
        { texto: 'Tenho um pouco de experiência',    proximo: 'vendas_meio' },
      ]
    },

    vendas_experiente: {
      mensagem: `Que ótimo! Com sua experiência você vai ter uma *vantagem enorme* aqui 💪\n\nNossos distribuidores experientes costumam ter resultado *já na primeira semana*.\n\nA equipe complementa com estratégias digitais modernas para você escalar ainda mais 🚀`,
      opcoes: [
        { texto: '✅ Quero saber os próximos passos',    proximo: 'como_funciona' },
        { texto: '📅 Quero participar de uma apresentação', proximo: 'convite_reuniao' },
      ]
    },

    vendas_iniciante: {
      mensagem: `Fica tranquilo(a) 😊\n\nVendas é *habilidade*.\nE habilidade pode ser *aprendida*.\n\nA maioria das pessoas começa sem experiência e aprende no processo com o suporte da equipe.\n\nO importante é dar o primeiro passo 💜`,
      opcoes: [
        { texto: '✅ Quero aprender e começar',          proximo: 'como_funciona' },
        { texto: '❓ Tenho uma dúvida antes',            proximo: 'duvidas_menu' },
      ]
    },

    vendas_meio: {
      mensagem: `Show! Com um pouco de experiência você já sai na frente 😊\n\nAqui você vai ter *produto que se vende sozinho* + suporte completo da nossa equipe.\n\nA curva de aprendizado é rápida para quem já tem alguma base 🚀`,
      opcoes: [
        { texto: '✅ Quero saber os próximos passos',    proximo: 'como_funciona' },
        { texto: '📅 Quero participar de uma apresentação', proximo: 'convite_reuniao' },
      ]
    },

    /* ── CONSTRUÇÃO DE EQUIPE ── */
    equipe: {
      mensagem: `Além das vendas, existe a possibilidade de *desenvolver equipe* e criar renda recorrente através do crescimento da rede 😊\n\nA Jan Rosê possui um sistema de *bônus e crescimento* baseado na movimentação da equipe e recompra.\n\nQuanto maior o desenvolvimento dentro do negócio, maiores podem ser:\n✔ os lucros\n✔ os benefícios\n✔ os bônus\n✔ as oportunidades`,
      opcoes: [
        { texto: '🏆 Quero saber mais sobre isso',       proximo: 'como_funciona' },
        { texto: '📅 Quero ver uma apresentação',        proximo: 'convite_reuniao' },
        { texto: '❓ Tenho dúvidas',                     proximo: 'duvidas_menu' },
      ]
    },

    /* ── DESENVOLVIMENTO PESSOAL ── */
    desenvolvimento: {
      mensagem: `Aqui acreditamos que crescimento financeiro também passa pelo *crescimento pessoal* 💜\n\nA equipe trabalha:\n✔ mentalidade\n✔ comunicação\n✔ liderança\n✔ desenvolvimento emocional\n✔ educação financeira\n✔ estratégias de crescimento\n\nTransformação real começa de dentro para fora 🌱`,
      opcoes: [
        { texto: '💜 Quero fazer parte desse ambiente',  proximo: 'como_funciona' },
        { texto: '📅 Quero ver uma apresentação',        proximo: 'convite_reuniao' },
      ]
    },

    /* ── CONHECER O PROJETO ── */
    projeto: {
      mensagem: `A *Equipe Alvo Negócio* é um projeto de empreendedorismo em parceria com a *Jan Rosê*.\n\nNosso objetivo é ajudar pessoas a:\n✔ gerar renda\n✔ aprender vendas\n✔ crescer pessoalmente\n✔ desenvolver liderança\n✔ construir equipe\n✔ trabalhar online e presencial\n\nTrabalhamos com *suporte real, treinamento contínuo e acompanhamento* desde o início 😊`,
      opcoes: [
        { texto: '🙋 Quero entender melhor como funciona', proximo: 'como_funciona' },
        { texto: '📅 Quero ver uma apresentação',          proximo: 'convite_reuniao' },
        { texto: '❓ Tenho dúvidas',                       proximo: 'duvidas_menu' },
      ]
    },

    /* ── COMO FUNCIONA ── */
    como_funciona: {
      mensagem: `Vou te explicar de forma bem simples 😊\n\nExistem *dois caminhos* que você pode combinar:\n\n*1️⃣ Vender os produtos*\nVocê vende e o lucro vai direto pra você. Simples assim.\n\n*2️⃣ Indicar pessoas*\nVocê indica alguém, essa pessoa também vende, e você recebe bônus pelo crescimento da rede.\n\nE a melhor parte: a Equipe *Alvo Negócio* está do seu lado desde o primeiro dia 💜\n\nTem alguma dúvida sobre isso?`,
      opcoes: [
        { texto: '✅ Entendi! Quero dar o próximo passo',      proximo: 'convite_reuniao' },
        { texto: '❓ Ainda tenho dúvidas',                    proximo: 'duvidas_menu' },
        { texto: '🔒 Preciso ter experiência?',               proximo: 'duvida_experiencia' },
      ]
    },

    /* ── DÚVIDAS ── */
    duvidas_menu: {
      mensagem: `Claro, pode perguntar à vontade 😊\n\nNão existe pergunta errada aqui.\nQual dessas está passando pela sua cabeça?`,
      opcoes: [
        { texto: '🔒 Preciso ter experiência?',             proximo: 'duvida_experiencia' },
        { texto: '📦 Precisa ter estoque?',                 proximo: 'duvida_estoque' },
        { texto: '💸 Como ganho dinheiro?',                 proximo: 'duvida_ganho' },
        { texto: '📚 Tem treinamento e suporte?',           proximo: 'duvida_suporte' },
        { texto: '📱 Posso trabalhar pelo celular?',        proximo: 'duvida_celular' },
        { texto: '😟 Já tive experiência ruim antes',       proximo: 'gatilho_experiencia_ruim' },
        { texto: '😰 Estou inseguro(a) sobre isso',         proximo: 'gatilho_inseguro' },
      ]
    },

    duvida_experiencia: {
      mensagem: `Não 😊\nA maioria das pessoas começa *sem experiência*.\n\nVocê recebe suporte, orientação e treinamento da equipe desde o primeiro dia.\n\nVendas é habilidade — e *habilidade pode ser aprendida* com o tempo e com prática 💜`,
      opcoes: [
        { texto: '✅ Boa! Quero dar o próximo passo',  proximo: 'convite_reuniao' },
        { texto: '❓ Tenho outra dúvida',             proximo: 'duvidas_menu' },
      ]
    },

    duvida_estoque: {
      mensagem: `*Não precisa de estoque!* 🙌\n\nVocê pode trabalhar de duas formas:\n\n1️⃣ *Comprando e revendendo* — compra o que já tem cliente certo\n2️⃣ *Catálogo digital* — mostra o catálogo, fecha o pedido e compra só depois\n\nSem risco de ficar com produto parado! 😊`,
      opcoes: [
        { texto: '✅ Ótimo! Quero saber mais',        proximo: 'convite_reuniao' },
        { texto: '❓ Tenho outra dúvida',             proximo: 'duvidas_menu' },
      ]
    },

    duvida_ganho: {
      mensagem: `Existem várias possibilidades 😊\n\n✔ lucro nas vendas\n✔ recompra de clientes\n✔ bônus de crescimento\n✔ desenvolvimento de equipe\n✔ campanhas e incentivos\n\nCombinando as fontes, os resultados crescem com o tempo e com dedicação 🚀`,
      opcoes: [
        { texto: '✅ Entendi! Quero dar o próximo passo',      proximo: 'convite_reuniao' },
        { texto: '❓ Tenho outra dúvida',                     proximo: 'duvidas_menu' },
      ]
    },

    duvida_suporte: {
      mensagem: `Sim 😊\n\nA equipe trabalha com:\n✔ vendas\n✔ atendimento\n✔ marketing digital\n✔ liderança\n✔ desenvolvimento pessoal\n✔ estratégias online\n\nVocê *não fica sozinho(a)*. A Equipe Alvo Negócio oferece suporte, treinamentos, direcionamento e acompanhamento 💜`,
      opcoes: [
        { texto: '✅ Esse suporte faz diferença! Quero dar o próximo passo', proximo: 'convite_reuniao' },
        { texto: '❓ Tenho outra dúvida',                       proximo: 'duvidas_menu' },
      ]
    },

    duvida_celular: {
      mensagem: `Sim 🚀\n\nHoje muitas pessoas desenvolvem o negócio usando apenas:\n✔ celular\n✔ WhatsApp\n✔ redes sociais\n✔ atendimento online\n\nVocê trabalha de onde quiser, no horário que preferir 😊`,
      opcoes: [
        { texto: '✅ Perfeito! Quero começar',        proximo: 'convite_reuniao' },
        { texto: '❓ Tenho outra dúvida',             proximo: 'duvidas_menu' },
      ]
    },

    /* ── GATILHOS EMOCIONAIS ── */
    gatilho_inseguro: {
      mensagem: `É normal sentir isso 😊\n\nA maioria das pessoas chega aqui com esse mesmo sentimento.\n\nInsegurança não significa incapacidade.\nSignifica que você está pensando com cuidado — e isso é muito bom.\n\nVocê não precisa ter certeza de nada agora.\nPode só conversar, tirar dúvidas e ir no seu tempo 💜\n\nEstou aqui sem pressa.`,
      opcoes: [
        { texto: '💜 Isso me ajudou! Quero dar o próximo passo', proximo: 'convite_reuniao' },
        { texto: '❓ Ainda tenho dúvidas',               proximo: 'duvidas_menu' },
      ]
    },

    gatilho_experiencia_ruim: {
      mensagem: `Entendo você 😊\n\nE é muito importante falar sobre isso.\n\nTer passado por algo que não funcionou deixa uma marca — e faz toda a diferença ser honesto(a) sobre isso.\n\nAqui a gente não pressiona ninguém.\nNão tem promessa de riqueza rápida.\nO que existe é suporte real, acompanhamento e crescimento gradual 💜\n\nVocê pode fazer perguntas, tirar dúvidas e tomar sua decisão com calma.`,
      opcoes: [
        { texto: '💜 Quero conhecer melhor',              proximo: 'como_funciona' },
        { texto: '✅ Quero dar o próximo passo',              proximo: 'convite_reuniao' },
      ]
    },

    /* ── CONVITE PARA REUNIÃO / APRESENTAÇÃO ── */
    convite_reuniao: {
      mensagem: `*{nome}*, o próximo passo é simples 😊\n\nNossa equipe entra em contato com você pelo WhatsApp — uma conversa tranquila, sem pressão, sem compromisso.\n\nVocê conhece melhor, tira as últimas dúvidas e decide com calma 💜\n\nSó precisamos do seu número para te conectar:`,
      opcoes: [
        { texto: '✅ Sim! Me conecta com a equipe',        proximo: 'captura_nome' },
        { texto: '💬 Prefiro entender mais antes',         proximo: 'como_funciona' },
        { texto: '❓ Tenho dúvidas ainda',                 proximo: 'duvidas_menu' },
      ]
    },

    /* ── CAPTURA ── */
    captura_nome: {
      mensagem: `Ótimo, *{nome}*! 😊\n\nMe passa seu *WhatsApp com DDD*:`,
      input: { tipo: 'tel', placeholder: '(11) 99999-9999', proximo: 'finalizar', variavel: 'whats' }
    },

    captura_whats: {
      mensagem: `Anotado! 💜\n\nMe passa seu *WhatsApp com DDD* para nossa equipe entrar em contato:`,
      input: { tipo: 'tel', placeholder: '(11) 99999-9999', proximo: 'finalizar', variavel: 'whats' }
    },

    finalizar: {
      mensagem: `Fico muito feliz, *{nome}*! 💜\n\nVocê foi direcionado(a) para *{membro_nome}*, que será o seu ponto de apoio nessa jornada 🌟\n\nAgora siga os passos:\n\n*1️⃣ Acesse seu link de cadastro:*\n{membro_link}\n\n*2️⃣ Após o cadastro, acesse:*\nhttps://janrose.digital\n\n*3️⃣ No Escritório Virtual, escolha seu plano:*\n💼 R$ 197 — Kit inicial\n💎 R$ 297 — Kit completo\n\nFoi um prazer conversar com você! Até lá 😊`,
      acao: 'abrir_whatsapp'
    },

  }; // fim FLUXO

  /* ════════════════════════════════════════
     ESTILOS
  ════════════════════════════════════════ */
  const estilos = `
    #an-chat-bubble {
      position: fixed;
      bottom: 100px;
      left: 28px;
      width: 58px;
      height: 58px;
      background: ${CONFIG.cor_principal};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,255,56,0.4);
      z-index: 9998;
      transition: transform 0.2s;
      animation: an-pulse 3s infinite;
    }
    #an-chat-bubble:hover { transform: scale(1.08); }
    @keyframes an-pulse {
      0%,100% { box-shadow: 0 4px 20px rgba(0,255,56,0.35); }
      50%      { box-shadow: 0 4px 32px rgba(0,255,56,0.65); }
    }
    #an-chat-bubble svg { width: 26px; height: 26px; fill: #000; }
    #an-chat-notif {
      position: absolute;
      top: -3px; right: -3px;
      background: #FF3B30;
      color: #fff;
      width: 18px; height: 18px;
      border-radius: 50%;
      font-size: 11px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Inter', sans-serif;
    }
    #an-chat-box {
      position: fixed;
      bottom: 172px;
      left: 28px;
      width: 340px;
      max-height: 540px;
      background: #0D0D0D;
      border: 1px solid rgba(0,255,56,0.2);
      border-radius: 16px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      box-shadow: 0 16px 48px rgba(0,0,0,0.7);
      font-family: 'Inter', 'Segoe UI', sans-serif;
      animation: an-slideup 0.25s ease;
    }
    @keyframes an-slideup {
      from { opacity:0; transform: translateY(14px); }
      to   { opacity:1; transform: translateY(0); }
    }
    #an-chat-header {
      background: #141414;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      padding: 13px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #an-chat-avatar {
      width: 38px; height: 38px;
      background: linear-gradient(135deg, ${CONFIG.cor_principal}, #00cc2e);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; font-weight: 900; color: #000;
      flex-shrink: 0;
    }
    #an-chat-info { flex: 1; min-width: 0; }
    #an-chat-nome { font-size: 13px; font-weight: 700; color: #fff; }
    #an-chat-status { font-size: 11px; color: ${CONFIG.cor_principal}; margin-top: 1px; }
    #an-chat-fechar {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,0.35); font-size: 18px;
      padding: 4px; line-height: 1; transition: color 0.2s;
    }
    #an-chat-fechar:hover { color: #fff; }
    #an-chat-msgs {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
    }
    #an-chat-msgs::-webkit-scrollbar { width: 3px; }
    #an-chat-msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
    .an-msg-bot, .an-msg-user {
      max-width: 88%;
      font-size: 13px;
      line-height: 1.6;
      border-radius: 12px;
      padding: 10px 13px;
      word-break: break-word;
      animation: an-fadein 0.2s ease;
    }
    @keyframes an-fadein { from { opacity:0; transform:translateY(4px); } to { opacity:1; } }
    .an-msg-bot {
      background: #1C1C1C;
      color: rgba(255,255,255,0.9);
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .an-msg-user {
      background: ${CONFIG.cor_principal};
      color: #000;
      font-weight: 600;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }
    .an-msg-bot strong { color: ${CONFIG.cor_principal}; font-weight: 700; }
    .an-digitando {
      background: #1C1C1C;
      border-radius: 12px;
      border-bottom-left-radius: 4px;
      padding: 12px 16px;
      align-self: flex-start;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .an-digitando span {
      width: 6px; height: 6px;
      background: rgba(255,255,255,0.35);
      border-radius: 50%;
      animation: an-bounce 1.3s infinite;
    }
    .an-digitando span:nth-child(2) { animation-delay: 0.18s; }
    .an-digitando span:nth-child(3) { animation-delay: 0.36s; }
    @keyframes an-bounce {
      0%,80%,100% { transform: translateY(0); opacity: 0.4; }
      40%          { transform: translateY(-6px); opacity: 1; }
    }
    #an-chat-opcoes {
      padding: 4px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex-shrink: 0;
    }
    .an-opcao {
      background: #1A1A1A;
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.85);
      font-size: 12.5px;
      font-weight: 500;
      padding: 9px 13px;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: all 0.15s;
      line-height: 1.4;
    }
    .an-opcao:hover {
      background: #232323;
      border-color: rgba(0,255,56,0.3);
      color: #fff;
      transform: translateX(3px);
    }
    #an-chat-input-area {
      padding: 8px 12px 14px;
      display: none;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    #an-chat-input {
      flex: 1;
      background: #1C1C1C;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 10px 13px;
      font-size: 13px;
      color: #fff;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    #an-chat-input:focus { border-color: rgba(0,255,56,0.35); }
    #an-chat-input::placeholder { color: rgba(255,255,255,0.25); }
    #an-chat-enviar {
      background: ${CONFIG.cor_principal};
      border: none;
      width: 36px; height: 36px;
      border-radius: 8px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, transform 0.1s;
      flex-shrink: 0;
    }
    #an-chat-enviar:hover { background: #00e034; transform: scale(1.05); }
    #an-chat-enviar svg { width: 15px; height: 15px; fill: #000; }
    @media(max-width: 400px) {
      #an-chat-box { width: calc(100vw - 32px); left: 16px; bottom: 162px; }
      #an-chat-bubble { left: 16px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = estilos;
  document.head.appendChild(styleEl);

  /* ════════════════════════════════════════
     HTML DO CHAT
  ════════════════════════════════════════ */
  const htmlChat = `
    <div id="an-chat-bubble" onclick="anChat.toggle()" title="Fale com a Lia">
      <div id="an-chat-notif">1</div>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.942 7.942 0 01-4.073-1.116l-.291-.174-3.012.896.896-3.012-.174-.291A7.942 7.942 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.844c-.241-.12-1.427-.704-1.648-.784-.221-.08-.382-.12-.543.12-.16.24-.623.784-.763.944-.14.16-.281.18-.522.06-.241-.12-1.018-.375-1.939-1.198-.716-.64-1.2-1.428-1.341-1.668-.14-.24-.015-.37.105-.49.108-.108.241-.281.362-.421.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.543-1.308-.743-1.788-.195-.468-.395-.405-.543-.413-.14-.007-.3-.009-.462-.009-.16 0-.421.06-.642.3-.22.24-.843.824-.843 2.01 0 1.185.863 2.33.984 2.49.12.16 1.7 2.597 4.12 3.64.576.248 1.025.397 1.374.507.577.184 1.103.158 1.518.096.463-.069 1.427-.584 1.628-1.146.2-.562.2-1.044.14-1.145-.06-.1-.221-.16-.462-.28z"/>
      </svg>
    </div>
    <div id="an-chat-box">
      <div id="an-chat-header">
        <div id="an-chat-avatar">A</div>
        <div id="an-chat-info">
          <div id="an-chat-nome">Lia · Alvo Negócio</div>
          <div id="an-chat-status">● Online agora</div>
        </div>
        <button id="an-chat-fechar" onclick="anChat.toggle()">✕</button>
      </div>
      <div id="an-chat-msgs"></div>
      <div id="an-chat-opcoes"></div>
      <div id="an-chat-input-area">
        <input type="text" id="an-chat-input" placeholder="Digite aqui...">
        <button id="an-chat-enviar" onclick="anChat.enviarInput()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlChat;
  document.body.appendChild(wrapper);

  /* ════════════════════════════════════════
     LÓGICA DO CHATBOT
  ════════════════════════════════════════ */
  window.anChat = {
    aberto: false,
    dados: {},
    etapaInput: null,

    toggle() {
      const box   = document.getElementById('an-chat-box');
      const notif = document.getElementById('an-chat-notif');
      this.aberto = !this.aberto;
      box.style.display = this.aberto ? 'flex' : 'none';
      if (notif) notif.style.display = 'none';
      if (this.aberto && document.getElementById('an-chat-msgs').children.length === 0) {
        setTimeout(() => this.ir('inicio'), 500);
      }
    },

    ir(etapa) {
      const no = FLUXO[etapa];
      if (!no) return;

      const opcoes    = document.getElementById('an-chat-opcoes');
      const inputArea = document.getElementById('an-chat-input-area');
      opcoes.innerHTML = '';
      inputArea.style.display = 'none';
      this.etapaInput = null;

      this.mostrarDigitando(() => {
        // Substituir variáveis {nome}, {whats}, etc.
        let msg = no.mensagem || '';
        // Injeta dados do usuário
        Object.keys(this.dados).forEach(k => {
          msg = msg.replace(new RegExp(`\\{${k}\\}`, 'g'), this.dados[k]);
        });
        // Injeta dados do membro da fila
        const _membro = getMembroAtual();
        msg = msg.replace(/\{membro_nome\}/g, _membro.nome);
        msg = msg.replace(/\{membro_link\}/g, _membro.link);

        this.addMensagem(msg, 'bot');

        if (no.acao === 'abrir_whatsapp') {
          setTimeout(() => this.abrirWhatsApp(), 1400);
          return;
        }

        if (no.opcoes && no.opcoes.length) {
          setTimeout(() => {
            no.opcoes.forEach(op => {
              const btn = document.createElement('button');
              btn.className = 'an-opcao';
              btn.textContent = op.texto;
              btn.onclick = () => {
                this.addMensagem(op.texto, 'user');
                opcoes.innerHTML = '';
                setTimeout(() => this.ir(op.proximo), 350);
              };
              opcoes.appendChild(btn);
            });
          }, 150);
        }

        if (no.input) {
          this.etapaInput = no.input;
          const inp = document.getElementById('an-chat-input');
          inp.type        = no.input.tipo || 'text';
          inp.placeholder = no.input.placeholder || 'Digite aqui...';
          inp.value = '';
          inputArea.style.display = 'flex';
          setTimeout(() => inp.focus(), 300);
        }
      });
    },

    mostrarDigitando(callback) {
      const msgs = document.getElementById('an-chat-msgs');
      const dot  = document.createElement('div');
      dot.className = 'an-digitando';
      dot.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(dot);
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => {
        dot.remove();
        callback();
      }, CONFIG.tempo_digitando);
    },

    addMensagem(texto, tipo) {
      const msgs = document.getElementById('an-chat-msgs');
      const div  = document.createElement('div');
      div.className = tipo === 'bot' ? 'an-msg-bot' : 'an-msg-user';
      // Formatar *negrito* e quebras de linha
      div.innerHTML = texto
        .replace(/\n/g, '<br>')
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    },

    enviarInput() {
      if (!this.etapaInput) return;
      const inp   = document.getElementById('an-chat-input');
      const valor = inp.value.trim();
      if (!valor) return;

      this.dados[this.etapaInput.variavel] = valor;
      this.addMensagem(valor, 'user');
      inp.value = '';

      const proximo = this.etapaInput.proximo;
      this.etapaInput = null;
      document.getElementById('an-chat-input-area').style.display = 'none';
      setTimeout(() => this.ir(proximo), 350);
    },

    abrirWhatsApp() {
      const membro = getMembroAtual();
      const nome   = this.dados.nome  || 'Visitante';
      const whats  = this.dados.whats || '';

      // ── MENSAGEM DE PARABÉNS para o MEMBRO (para Lia enviar depois) ──
      const msgParaMembro =
        `🎉 *PARABÉNS, ${membro.nome}!*\n\n` +
        `Você acaba de receber mais um novo distribuidor na sua equipe! 🚀\n\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Nome:* ${nome}\n` +
        `📱 *WhatsApp:* ${whats}\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `Entre em contato e envie seu link:\n` +
        `👉 ${membro.link}\n\n` +
        `Continue crescendo! 🌟💜`;

      // ── NOTIFICAÇÃO PARA A LIA ──
      // A Lia recebe no WhatsApp dela com link de 1 toque para notificar o membro
      const linkParaMembro = `https://wa.me/${membro.whats}?text=${encodeURIComponent(msgParaMembro)}`;

      const msgLia = encodeURIComponent(
        `🤖 *NOVO CADASTRO — Alvo Negócio*\n\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Nome:* ${nome}\n` +
        `📱 *WhatsApp:* ${whats}\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `Esta pessoa foi direcionada para *${membro.nome}*\n\n` +
        `👇 *Toque aqui para notificar ${membro.nome} com 1 clique:*\n` +
        `${linkParaMembro}`
      );

      // Avança a fila automaticamente
      avancarFila();

      // Abre WhatsApp DA LIA para ela receber a notificação
      setTimeout(() => {
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msgLia}`, '_blank');
      }, 1500);
    }
  };

  // Enter para enviar
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && anChat.etapaInput) anChat.enviarInput();
  });

  // Abre automaticamente após 10 segundos na primeira visita
  if (!sessionStorage.getItem('Lia_visto')) {
    setTimeout(() => {
      sessionStorage.setItem('Lia_visto', '1');
      if (!anChat.aberto) anChat.toggle();
    }, 10000);
  }

})();
