import { ConfigType } from '@/types/config'

export default function HomePageHero({ config }: { config: ConfigType }) {
  return (
    <>
      <div className="relative mt-6 wrapper pointer-events-none">
        <section className="relative w-full h-[40.25vw] bg-transparent">
          <div className="wrapper z-40 absolute top-0 w-full h-full bg-transparent pointer-events:none ">
            <div className="w-full relative left-0 top-0  opacity-100 before:absolute before:top-0 before:left-0 h-full bg-transparent overflow-hidden">
              <div className="relative h-full bg-transparent">
                <div className="absolute w-full h-full block bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute w-screen h-screen -top-[25%] -bottom-[10%]">
                        <div className="responsive-iframe">
                          <iframe
                            frameBorder={0}
                            src={`https://www.youtube.com/embed/${config.videoUrl_1}?playlist=${config.videoUrl_1}&loop=1&autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&start=5&end=179?loading=lazy`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                            width="100%"
                            height="100%"
                            rel="preload"
                            title="Share2Receive"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
