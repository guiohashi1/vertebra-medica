/**
 * Dados comerciais da Vertebra Médica.
 * Telefone: somente dígitos, com DDI 55. Exibição fica em WHATSAPP_DISPLAY.
 */
export const WHATSAPP_PHONE = '5519991119773'
export const WHATSAPP_DISPLAY = '(19) 99111-9773'

export const brand = {
  name: 'Vertebra Médica',
  short: 'Vertebra',
}

export type ProductId = 'eletrica' | 'manual' | 'colchao'

/**
 * Foto real do hero. Coloque o arquivo em public/ e preencha src + alt.
 * null = ainda não há foto do produto (não publicar como se fosse foto real).
 */
export const heroPhoto: { src: string; alt: string } | null = null

/**
 * Fotos reais por produto. Sem arquivo, a ficha mostra um espaço pendente.
 * Exemplo: eletrica: { src: '/produtos/cama-eletrica.jpg', alt: 'Cama hospitalar elétrica Vertebra, vista lateral' }
 */
export const productPhotos: Partial<
  Record<ProductId, { src: string; alt: string }>
> = {}

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
    name: 'Colchão hospitalar',
    tag: 'Colchão',
    description:
      'Colchão hospitalar para uso com as camas da linha. Medidas e condições são informados no orçamento.',
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

/** Comparação limitada ao que o catálogo já define: o tipo de acionamento. */
export const comparison = {
  title: 'Elétrica ou manual',
  lead: 'Nesta página, a diferença registrada entre as duas camas é o acionamento.',
  rows: [
    {
      label: 'Acionamento',
      eletrica: 'Elétrico',
      manual: 'Manual',
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
  let text = 'Olá. Quero solicitar um orçamento de cama hospitalar ou colchão.'

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
