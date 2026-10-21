/**
 * Dados comerciais da Oficina das Camas.
 * Telefone: somente dígitos, com DDI 55. Exibição fica em WHATSAPP_DISPLAY.
 */
export const WHATSAPP_PHONE = '558196194261'
export const WHATSAPP_DISPLAY = '(81) 9619-4261'

export const brand = {
  name: 'Oficina das Camas',
  short: 'Oficina',
  /** Parte em itálico na marca (nav e rodapé). */
  accent: 'Camas',
}

export const pageLinks = [
  { href: '#catalogo', label: 'Modelos' },
  { href: '#comparativo', label: 'Elétrica ou manual' },
  { href: '#orcamento', label: 'Orçamento' },
] as const

export type ProductId =
  | 'eletrica'
  | 'manual'
  | 'colchao'
  | 'poltrona'
  | 'cadeira'
  | 'transferencia'

export type ProductPhoto = {
  src: string
  alt: string
}

/**
 * Destaque do hero: imagem fixa de ambiente (sem seletor de modelo).
 * Lista vazia = modelo 3D ilustrativo.
 */
export const heroSlides: (ProductPhoto & { name: string; short: string })[] = [
  {
    src: '/produtos/hero/enfermaria.jpg',
    alt: 'Paciente e acompanhante em quarto com cama hospitalar',
    name: 'Cuidado em home care e clínicas',
    short: 'Ambiente',
  },
]

/** Compatibilidade: primeira foto do hero, se existir. */
export const heroPhoto: ProductPhoto | null = heroSlides[0] ?? null

/**
 * Galeria por produto. Lista vazia ou ausente: catálogo mostra "Foto pendente".
 * Versões anteriores ficam em public/produtos/.../studio-arquivo.
 */
export const productPhotos: Partial<Record<ProductId, ProductPhoto[]>> = {
  eletrica: [
    {
      src: '/produtos/eletrica/studio/01-hero.jpg',
      alt: 'Cama hospitalar elétrica, vista geral',
    },
    {
      src: '/produtos/eletrica/studio/02-estrado.jpg',
      alt: 'Cama hospitalar elétrica, estrado e controle',
    },
    {
      src: '/produtos/eletrica/studio/03-articulada.jpg',
      alt: 'Cama hospitalar elétrica, posição articulada',
    },
    {
      src: '/produtos/eletrica/studio/04-ambiente.jpg',
      alt: 'Cama hospitalar elétrica em ambiente hospitalar, com grades e controle',
    },
    {
      src: '/produtos/eletrica/studio/05-movimentos.jpg',
      alt: 'Diagrama dos movimentos da cama hospitalar elétrica',
    },
  ],
  manual: [
    {
      src: '/produtos/manual/studio/01-lateral.jpg',
      alt: 'Cama hospitalar manual, vista lateral',
    },
    {
      src: '/produtos/manual/studio/03-frontal.jpg',
      alt: 'Cama hospitalar manual, vista frontal',
    },
    {
      src: '/produtos/manual/studio/02-detalhe-grade.jpg',
      alt: 'Cama hospitalar manual, detalhe das grades',
    },
    {
      src: '/produtos/manual/studio/04-articulada.jpg',
      alt: 'Cama hospitalar manual articulada, com manivelas e grades',
    },
  ],
  colchao: [
    {
      src: '/produtos/colchao/studio/03-detalhe.png',
      alt: 'Colchão hospitalar D33, detalhe da capa em napa',
    },
    {
      src: '/produtos/colchao/studio/01-geral.jpg',
      alt: 'Colchão hospitalar D33 com capa azul impermeável, vista geral',
    },
    {
      src: '/produtos/colchao/studio/04-impermeavel.jpg',
      alt: 'Colchão hospitalar D33, capa impermeável com zíper',
    },
  ],
  poltrona: [
    {
      src: '/produtos/poltrona/studio/01-geral.jpg',
      alt: 'Poltrona de acompanhante reclinável, vista geral',
    },
    {
      src: '/produtos/poltrona/studio/03-reclinada.jpg',
      alt: 'Poltrona de acompanhante na posição reclinada',
    },
  ],
  cadeira: [
    {
      src: '/produtos/cadeira/studio/01-geral.jpg',
      alt: 'Cadeira de rodas padrão, vista geral',
    },
    {
      src: '/produtos/cadeira/studio/03-traseira.jpg',
      alt: 'Cadeira de rodas padrão, vista traseira',
    },
  ],
  // Fotos da cadeira de transferência: aguardando envio do cliente.
}

export const products: {
  id: ProductId
  name: string
  tag: string
  description: string
  points: string[]
}[] = [
  {
    id: 'eletrica',
    name: 'Cama hospitalar elétrica',
    tag: 'Acionamento elétrico',
    description:
      'Cama hospitalar com os movimentos básicos de costas e pernas, elevação, cardíaca, trendelemburg e proclive.',
    points: [
      'Altura: sob consulta',
      'Largura: sob consulta',
      'Suporta até 120 kg',
    ],
  },
  {
    id: 'manual',
    name: 'Cama hospitalar manual',
    tag: 'Acionamento manual',
    description:
      'Cama hospitalar com acionamento manual por manivelas. A altura da cama é fixa, faz os movimentos de costas e de pernas.',
    points: [
      'Altura: sob consulta',
      'Largura: sob consulta',
      'Suporta até 120 kg',
    ],
  },
  {
    id: 'colchao',
    name: 'Colchão hospitalar D33',
    tag: 'Densidade D33',
    description: 'Colchão hospitalar em espuma de densidade D33.',
    points: ['Largura: 90 cm', 'Comprimento: 1,90 m', 'Altura: 10 cm'],
  },
  {
    id: 'poltrona',
    name: 'Poltrona de acompanhante',
    tag: 'Reclinável',
    description:
      'Poltrona reclinável para acompanhante. Medidas, cores e condições são informados no orçamento.',
    points: [],
  },
  {
    id: 'cadeira',
    name: 'Cadeira de Rodas Padrão',
    tag: 'Manual',
    description: 'Cadeira de rodas padrão para mobilidade.',
    points: [
      'Construída em aço carbono',
      'Estrutura dobrável em X',
      'Encosto e assento em nylon',
      'Pneus maciços',
      'Capacidade para 90 kg',
      'Largura do assento 40 cm e largura total 64 cm',
      'Marca: Jaguaribe',
    ],
  },
  {
    id: 'transferencia',
    name: 'Cadeira de transferência',
    tag: 'Transferência',
    description:
      'Cadeira de transferência. Medidas e condições são informados no orçamento.',
    points: [],
  },
]

/**
 * Preencha somente com informação confirmada. Campos vazios não aparecem na página.
 */
export const companyFacts: { label: string; text: string }[] = [
  {
    label: 'Região atendida',
    text: 'Recife e região metropolitana. Outras localidades sob consulta.',
  },
  {
    label: 'Entrega e montagem',
    text: 'Equipe especializada para entrega, montagem, orientações e solução de problemas técnicos. Com a Oficina das Camas o suporte pós venda é garantido.',
  },
  {
    label: 'Garantia e suporte',
    text: 'Há mais de seis anos no mercado de equipamentos hospitalares para Clínicas, Hospitais e Home Care, a garantia e suporte aos clientes é uma de nossas metas principais. Entregamos equipamentos e garantimos a continuidade de seu funcionamento.',
  },
  {
    label: 'Dados empresariais',
    text: 'A Oficina das Camas é uma empresa do ramo de aluguel e venda de equipamentos hospitalares para aplicação em diversos ambientes: hospitais, clínicas e home care. Trabalhamos com equipamentos novos e recuperados, entregando sempre equipamentos de qualidade comprovada.',
  },
]

/** Perguntas e respostas aprovadas. Lista vazia oculta a seção. */
export const faq: { question: string; answer: string }[] = []

/** Diferença entre as camas: como a posição é ajustada. Sem subtítulo "Característica". */
export const comparison = {
  title: 'Elétrica ou manual',
  rows: [
    {
      label: 'Acionamento',
      eletrica: 'Por controle remoto (botoneira) com botões de comando.',
      manual: 'Por manivelas, que precisam ser giradas manualmente.',
    },
    {
      label: 'Movimentos',
      eletrica:
        'Ajuste de encosto, pernas e altura de forma mais ampla, precisa e rápida.',
      manual:
        'Ajuste de altura do encosto e das pernas; em geral, mais limitados e feitos em etapas.',
    },
    {
      label: 'Esforço físico',
      eletrica:
        'Esforço mínimo: basta apertar um botão, o que facilita o trabalho do cuidador.',
      manual:
        'Exige força de quem cuida a cada ajuste, o que pode causar desgaste.',
    },
    {
      label: 'Alimentação elétrica',
      eletrica:
        'Funciona ligada à tomada (127V ou 220V, conforme o modelo); alguns modelos têm bateria de backup.',
      manual: 'Não utiliza energia elétrica.',
    },
  ],
}

/** Modelos 3D temporários (CC Attribution). Troque pelos arquivos oficiais quando existirem. */
export const productModels: Record<
  ProductId,
  {
    kind: 'glb' | 'procedural'
    path?: string
    procedural?: 'mattress'
  }
> = {
  eletrica: { kind: 'glb', path: '/models/cama-eletrica.glb' },
  manual: { kind: 'glb', path: '/models/cama-manual.glb' },
  colchao: { kind: 'procedural', procedural: 'mattress' },
  poltrona: { kind: 'glb' },
  cadeira: { kind: 'glb' },
  transferencia: { kind: 'glb' },
}

export const modelCredits = [
  {
    name: 'Hospital nursing bed (adjustable)',
    author: 'chenchanchong',
    license: 'CC Attribution',
    source:
      'https://sketchfab.com/3d-models/hospital-nursing-bed-f261d6ee5c7044afbf6b4e41ae4906f5',
  },
  {
    name: 'Hospital bed model',
    author: 'chenchanchong',
    license: 'CC Attribution',
    source: 'https://www.getglb.com/furniture/hospital-bed-model/',
  },
]

export const BRAZIL_UFS = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MG',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SC',
  'SE',
  'SP',
  'TO',
] as const

export type QuotePayload = {
  product?: string
  quantity?: string
  city?: string
  uf?: string
}

export function whatsappUrl(payload?: string | QuotePayload) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappText(payload))}`
}

export function whatsappText(payload?: string | QuotePayload) {
  let text =
    'Olá. Quero solicitar um orçamento de equipamentos hospitalares.'

  if (typeof payload === 'string') {
    text = `Olá. Quero solicitar um orçamento.\n\nProduto: ${payload}`
  } else if (payload) {
    const lines = ['Olá. Quero solicitar um orçamento.', '']
    if (payload.product) lines.push(`Produto: ${payload.product}`)
    if (payload.quantity) lines.push(`Quantidade: ${payload.quantity}`)
    const place = [payload.city, payload.uf].filter(Boolean).join('/')
    if (place) lines.push(`Cidade/UF: ${place}`)
    text = lines.join('\n')
  }

  return text
}
