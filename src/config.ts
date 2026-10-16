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

export type ProductPhoto = {
  src: string
  alt: string
}

/**
 * Destaque do hero: um ângulo limpo de cada cama.
 * Lista vazia = modelo 3D ilustrativo.
 */
export const heroSlides: (ProductPhoto & { name: string; short: string })[] = [
  {
    src: '/produtos/eletrica/studio/01-hero.jpg',
    alt: 'Cama hospitalar elétrica, vista geral',
    name: 'Cama hospitalar elétrica',
    short: 'Elétrica',
  },
  {
    src: '/produtos/manual/studio/01-lateral.jpg',
    alt: 'Cama hospitalar manual, vista lateral',
    name: 'Cama hospitalar manual',
    short: 'Manual',
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
      alt: 'Cadeira de rodas básica, vista geral',
    },
    {
      src: '/produtos/cadeira/studio/03-traseira.jpg',
      alt: 'Cadeira de rodas básica, vista traseira',
    },
  ],
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
      'Cama hospitalar com acionamento elétrico. Medidas, acessórios e condições são informados no orçamento.',
    points: [],
  },
  {
    id: 'manual',
    name: 'Cama hospitalar manual',
    tag: 'Acionamento manual',
    description:
      'Cama hospitalar com acionamento manual. Medidas, acessórios e condições são informados no orçamento.',
    points: [],
  },
  {
    id: 'colchao',
    name: 'Colchão hospitalar D33',
    tag: 'Densidade D33',
    description:
      'Colchão hospitalar em espuma densidade D33, para uso com as camas da linha. Medidas e condições são informados no orçamento.',
    points: [],
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
    name: 'Cadeira de rodas básica',
    tag: 'Manual',
    description:
      'Cadeira de rodas básica, de acionamento manual. Medidas e condições são informados no orçamento.',
    points: [],
  },
]

/**
 * Preencha somente com informação confirmada. Campos vazios não aparecem na página.
 */
export const companyFacts: { label: string; text: string }[] = [
  // { label: 'Região atendida', text: '' },
  // { label: 'Entrega e montagem', text: '' },
  // { label: 'Garantia e suporte', text: '' },
  // { label: 'Dados empresariais', text: '' },
]

/** Perguntas e respostas aprovadas. Lista vazia oculta a seção. */
export const faq: { question: string; answer: string }[] = []

/** Diferença entre as camas: como a posição é ajustada. Sem medida, preço ou garantia. */
export const comparison = {
  title: 'Elétrica ou manual',
  rows: [
    {
      label: 'Acionamento',
      eletrica: 'Ajuste pelo controle.',
      manual: 'Ajuste pela manivela.',
    },
    {
      label: 'Movimento',
      eletrica: 'Executado pelo motor.',
      manual: 'Executado pela manivela.',
    },
    {
      label: 'Esforço físico',
      eletrica: 'O ajuste dispensa esforço físico.',
      manual: 'O ajuste exige esforço na manivela.',
    },
    {
      label: 'Alimentação',
      eletrica: 'O ajuste requer energia elétrica.',
      manual: 'O ajuste dispensa alimentação elétrica.',
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
    'Olá. Quero solicitar um orçamento de cama hospitalar, colchão ou outro equipamento.'

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
