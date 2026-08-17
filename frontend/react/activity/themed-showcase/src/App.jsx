import './App.css'
import ProjetoCard from './components/ProjetoCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules' 
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow' 

function App() {
  const numero = [1, 2, 3, 4, 5, 6]
  
  return (
    <div className="container">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]} 
        effect={'coverflow'} 
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }} 
        className="mySwiper" 
      >
        {numero.map((n) => (
          <SwiperSlide key={n}>
            <ProjetoCard
              imagem={`/f${n}.jpg`}
              nome={`Campeão ${n}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default App