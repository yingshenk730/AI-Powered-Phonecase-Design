import Image from 'next/image'

const UserAvatar = ({
  userAvatar,
  classStyle,
}: {
  userAvatar: string
  classStyle?: string
}) => {
  return (
    <Image
      className={`inline-block rounded-full ring-2 ring-slate-100 ${classStyle}`}
      src={userAvatar}
      width={40}
      height={40}
      alt="User Avatar"
    />
  )
}

export default UserAvatar
