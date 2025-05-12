import ActiveFilter from '../Filter/ActiveFilter'

function EmptyRoomList() {
  return (
    <div className="container mx-auto">
      <ActiveFilter />
      <div className="w-full text-center text-2xl py-20 text-gray-500">
        해당 조건에 맞는 숙소가 없습니다.
      </div>
    </div>
  )
}

export default EmptyRoomList
