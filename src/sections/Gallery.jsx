import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Section, { Item, SectionTitle } from '../components/Section'

export default function Gallery({ gallery }) {
  return (
    <Section id="gallery" className="gallery">
      <SectionTitle>{gallery.title}</SectionTitle>
      <Item className="gallery__swiper">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.35}
          centeredSlides
          spaceBetween={14}
          loop
          grabCursor
          autoplay={{ delay: gallery.autoplayMs ?? 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 1.5, spaceBetween: 20 }, 1024: { slidesPerView: 1.7, spaceBetween: 24 } }}
        >
          {gallery.images.map((img, i) => (
            <SwiperSlide key={img.src}>
              <figure className="photo">
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 420px, 80vw"
                  alt={img.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable="false"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </Item>
    </Section>
  )
}
