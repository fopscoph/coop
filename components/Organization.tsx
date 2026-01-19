import Image from "next/image";

const images = [
    "/partners/1.webp",
    "/partners/2.webp",
    "/partners/3.webp",
    "/partners/4.webp",
    "/partners/5.webp",
    "/partners/6.webp",
    "/partners/7.webp",
    "/partners/8.webp",
    "/partners/9.webp",
    "/partners/1.webp",
];

export default function Organization() {
    return (
        <section className="mx-auto xl:w-4/5 px-5 py-20">
            <div className="w-full xl:w-5/6 mx-auto mb-16 text-center">
                <span className="mb-3 relative inline-block pl-5 uppercase text-xs text-[#F85E00] dot-orange">Our Partner Organizations</span>
                <h3 className="text-4xl mb-5 font-semibold cloud-burst">Working Hand in Hand with Our Partners</h3>
                <p className="text-lg cloud-burst font-light">We collaborate with government agencies, training institutions, platforms, and private organizations to expand access to digital skills, ethical work opportunities, and cooperative-led transformation initiatives.</p>
            </div>
            <div className="w-full xl:w-5/6 mx-auto">
                <div className="overflow-hidden whitespace-nowrap py-6 bg-white">
                    <div className="flex animate-marquee">
                        {images.map((src, i) => (
                        <div key={i} className="mx-8 shrink-0">
                            <Image src={src} alt="" width={100} height={100} />
                        </div>
                        ))}
                        {images.map((src, i) => (
                        <div key={`dupe-${i}`} className="mx-8 shrink-0">
                            <Image src={src} alt="" width={100} height={100} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}