import TestimonialSlider from "@/components/Testimonials";

export default function Testimonial() {
    return (
            <section className="w-full px-5 py-20 bg-ghost-white text-center">
                <div className="w-full xl:w-5/6 mx-auto mb-16 text-center">
                    <span className="mb-5 inline-block uppercase text-xs text-[#F85E00] pl-5 relative dot-orange">Testimonials</span>
                    <h3 className="text-4xl mb-5 font-semibold cloud-burst">What People Are Saying</h3>
                    <p className="text-lg cloud-burst font-light">We collaborate with government agencies, training institutions, platforms, and private organizations <br className="rm-br-lg" />to expand access to digital skills, ethical work opportunities, and cooperative-led transformation initiatives.</p>
                </div>
                <div className="w-full xl:w-5/6 mx-auto text-center">
                    <TestimonialSlider />
                </div>
            </section>
    );
}