import './App.css'
import ProjetoCard from './components/ProjetoCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

function App() {
  const numero = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="container">
      <Swiper
        modules={[Navigation, Pagination, EffectCards]}
        effect={'cards'}
        grabCursor={true}
        navigation
        pagination={{clickable: true}} 
        className="mySwiper" 
      >
        {numero.map((n) => (
          <SwiperSlide key={n}>
            <ProjetoCard
              imagem={`/p${n}.jpg`}
              nome={`Projeto ${n}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default App