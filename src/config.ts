/** Altere o número para o WhatsApp comercial da empresa (somente dígitos, com DDI). */
export const WHATSAPP_PHONE = '5511999999999'

export const brand = {
  name: 'Vertebra Médica',
  short: 'Vertebra',
  region: 'Orçamento e montagem sob consulta',
}

export type ProductId = 'eletrica' | 'manual' | 'colchao'

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
    tag: 'Ajuste no controle',
    description:
      'Altura, dorso e pernas no controle. Menos esforço para reposicionar o paciente no dia a dia.',
    points: [
      'Controle simples de operar',
      'Grade lateral para segurança',
      'Rodízios com trava',
    ],
  },
  {
    id: 'manual',
    name: 'Cama hospitalar manual',
    tag: 'Simples e resistente',
    description:
      'Manivela firme, pouca manutenção. Leito articulado sem complicar o uso contínuo.',
    points: [
      'Acionamento por manivela',
      'Leito articulado',
      'Fácil de higienizar',
    ],
  },
  {
    id: 'colchao',
    name: 'Colchão hospitalar',
    tag: 'Suporte e higiene',
    description:
      'Densidade pensada para longas horas de repouso. Capa impermeável, fácil de limpar. Combina com as camas da linha.',
    points: [
      'Espuma de alta densidade',
      'Capa impermeável e lavável',
      'Serve em leitos articulares',
    ],
  },
]

export const trustItems = [
  {
    title: 'Orçamento direto',
    text: 'Você fala com a gente no WhatsApp. Sem loja no meio.',
  },
  {
    title: 'Durabilidade',
    text: 'Estrutura pensada para uso contínuo, não só para a primeira impressão.',
  },
  {
    title: 'Linha completa',
    text: 'Elétrica, manual e colchão. Dá para orçar o conjunto.',
  },
]

export const audiences = [
  {
    id: 'conforto',
    title: 'Conforto no leito',
    text: 'Apoio e estabilidade para quem permanece deitado por longos períodos.',
    waHint: 'foco em conforto no leito',
  },
  {
    id: 'cuidado',
    title: 'Praticidade no cuidado',
    text: 'Ajustes e movimentação pensados para quem opera a cama no dia a dia.',
    waHint: 'foco em praticidade no cuidado',
  },
  {
    id: 'conjunto',
    title: 'Cama e colchão',
    text: 'Monte a proposta com o modelo certo e o colchão compatível.',
    waHint: 'conjunto cama e colchão',
  },
]

export const comparison = {
  title: 'Elétrica ou manual?',
  lead: 'Duas opções. A escolha depende da rotina de ajuste e da preferência de operação.',
  rows: [
    {
      label: 'Acionamento',
      eletrica: 'Controle elétrico',
      manual: 'Manivela',
    },
    {
      label: 'Esforço na operação',
      eletrica: 'Menor',
      manual: 'Maior na manivela',
    },
    {
      label: 'Manutenção',
      eletrica: 'Baixa a média',
      manual: 'Bem baixa',
    },
    {
      label: 'Melhor quando',
      eletrica: 'Muitos ajustes de posição',
      manual: 'Uso simples e orçamento enxuto',
    },
  ],
}

/** Modelos 3D de teste (CC Attribution). Troque pelos .glb oficiais quando tiver. */
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

export type QuotePayload = {
  product?: string
  quantity?: string
  city?: string
  audience?: string
}

export function whatsappUrl(payload?: string | QuotePayload) {
  let text = 'Olá, gostaria de um orçamento de cama e colchão hospitalares.'

  if (typeof payload === 'string') {
    text = `Olá, gostaria de um orçamento da ${payload}.`
  } else if (payload) {
    const lines = ['Olá, gostaria de um orçamento.']
    if (payload.product) lines.push(`Modelo: ${payload.product}`)
    if (payload.quantity) lines.push(`Quantidade: ${payload.quantity}`)
    if (payload.city) lines.push(`Cidade: ${payload.city}`)
    if (payload.audience) lines.push(`Interesse: ${payload.audience}`)
    text = lines.join('\n')
  }

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}
