'use client'
export default function Map() {
  return (
    <div className="flex flex-1 flex-col justify-center mt-5 px-48 gap-10">
      <div className="flex flex-1 justify-center">
        <h1 className="text-3xl font-semibold text-green-800">Văn phòng Share2Receive</h1>
      </div>
      <iframe
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="no"
        src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=69/68%20%C4%90.%20%C4%90%E1%BA%B7ng%20Thu%E1%BB%B3%20Tr%C3%A2m,%20Ph%C6%B0%E1%BB%9Dng%2013,%20B%C3%ACnh%20Th%E1%BA%A1nh,%20H%E1%BB%93%20Ch%C3%AD%20Minh%2070000,%20Vi%E1%BB%87t%20Nam+()&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&language=vi"
      ></iframe>
    </div>
  )
}
