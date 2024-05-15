'use server'
import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'

export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configureId: string
}
// interface SaveConfigProps {
//   color: CaseColor
//   finish: CaseFinish
//   material: CaseMaterial
//   model: PhoneModel
//   configureId: string
// }
export async function saveConfig({
  color,
  finish,
  material,
  model,
  configureId,
}: SaveConfigArgs) {
  await db.configure.update({
    where: { id: configureId },
    data: {
      color,
      finish,
      material,
      model,
    },
  })
}
