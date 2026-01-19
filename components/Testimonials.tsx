"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
    name: string;
    role: string;
    avatar?: string;
    message: string;
    }

const testimonials: Testimonial[] = [
    {
        name: "Christine Virto",
        role: "VA Members",
        avatar: "/avatars/christine-virto.jpg",
        message:
        '"I thought freelancing was supposed to feel free… but some days, it just felt lonely..."'
    },
    {
        name: "Janet Toral",
        role: "E-Commerce Advocate, Digital Influencer, Digital Leader",
        avatar: "/avatars/janet-toral.jpg",
        message:
        '"An organization with a clear vision of developing more freelancers in the country..."'
    },
    {
        name: "Christine",
        role: "Online Professional",
        avatar: "/avatars/christine.jpg",
        message: "After I completed my trainings in DigitalJobsPH..."
    },
    {
        name: "Felix John 'FJ' Amin",
        role: "Economic Research & Data Specialist",
        avatar: "/avatars/fj-amin.jpg",
        message:
        '"If I had millions in my bank account, I’d proudly invest in FOPSCo..."'
    }
];

export default function TestimonialSlider() {
    return (
        <div className="w-full xl:w-5/6 mx-auto">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    el: ".testimonial-pagination",
                    clickable: true
                }}
                autoplay={{ delay: 3500}}
                loop={true}
                slidesPerView={3}
                slidesPerGroup={1}
                spaceBetween={20}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 }
                }}
                className="w-full"
            >
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <SlideCard testimonial={t} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="testimonial-pagination flex justify-center mt-6 gap-2"></div>
        </div>
    );
}

function SlideCard({ testimonial }: { testimonial: Testimonial }) {
    const [open, setOpen] = useState(false);
    const limit = 180;
    const isLong = testimonial.message.length > limit;
    const displayedMessage = open
        ? testimonial.message
        : testimonial.message.slice(0, limit) + "...";

    return (
        <div className="p-6 bg-white shadow rounded-lg h-full flex flex-col justify-between relative">
            <div>
                <p className="cold-burst text-sm font-light italic mb-4">
                {displayedMessage}
                </p>

                {isLong && (
                <span
                    onClick={() => setOpen(!open)}
                    className="cold-burst text-sm underline cursor-pointer"
                >
                    {open ? "Read less" : "Read more"}
                </span>
                )}
            </div>

            <div className="my-4 gap-3 text-center">
                <Image
                src="/avatars/user.webp"
                width={40}
                height={40}
                className="rounded-full object-cover mx-auto"
                alt={testimonial.name}
                />
                <div>
                    <div className="text-md cold-burst font-semibold">{testimonial.name}</div>
                    <div className="text-[12px] cold-burst font-light">{testimonial.role}</div>
                </div>
            </div>
        </div>
    );
}
