import Image from "next/image";

export default function AboveTheFold() {
    return (
        <section className="w-full bg-ghost-white">
            <div className="mx-auto xl:w-4/5 px-5 pt-25 pb-20 relative">
                <div className="w-full xl:w-5/6 mx-auto mb-16">
                    <h1 className="text-3xl md:text-4xl xl:text-4xl font-semibold cloud-burst text-center">A Cooperative Built for <span className="bright-orange">Shared Digital Growth</span> and <span className="bright-orange">Empowering Online Professionals</span></h1>
                </div>
                <div className="w-full xl:w-5/6 mx-auto text-center mb-20">
                    <p className="mb-5 md:text-md xl:text-lg font-light">We unite Filipino online professionals and local MSMEs through a member-owned cooperative that delivers ethical work, digital skills, and safety-by-design digital transformation.</p>
                </div>
                <div className="w-full rounded-3xl mx-auto bg-cloud-burst p-5 xl:p-12">
                    <span className="mb-5 block uppercase text-xs text-[#F85E00]">About</span>
                    <div className="flex flex-col md:flex-row justify-center items-center mb-30 space-y-5 space-0">
                        <div className="w-full xl:w-3/6">
                            <h2 className="text-white text-3xl xl:text-4xl font-semibold">Filipino Online Professional<br />Service Cooperative</h2>
                        </div>
                        <div className="w-full xl:w-3/6">
                            <p className="text-white font-light mb-4">FOPSCo is a national cooperative of Filipino online professionals, digital skills trainers, and service practitioners working together to create sustainable livelihoods online. We believe that when freelancers grow together, supported by ethical systems, continuous learning, and responsible technology, digital transformation creates an inclusive, practical, and sustainable-by-design ecosystem.</p>
                        </div>
                    </div>
                    <div className="grid xl:grid-cols-3 gap-5 pb-10">
                        <div className="bg-white rounded-2xl text-center px-5 pt-20 pb-10 mb-15 xl:mb-0 relative">
                            <div className="absolute left-1/2 translate-x-[-50%] top-[-45px]">
                                <Image src="/Our-Mission.svg" alt="Our Mission" width={90} height={90} />
                            </div>
                            <div className="flex items-center justify-center">
                                <div>
                                    <h3 className="text-2xl font-semibold cloud-burst mb-5">Our Mission</h3>
                                    <p className="font-light text-[15px] cloud-burst">To help Filipino online professionals achieve sustainable livelihoods through continuous education, mentoring, and ethical work opportunities, while strengthening local MSMEs through a supportive cooperative ecosystem.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl text-center px-5 pt-20 pb-10 mb-15 xl:mb-0 relative">
                            <div className="absolute left-1/2 translate-x-[-50%] top-[-45px]">
                                <Image src="/Our-Vision.svg" alt="Our Vision" width={90} height={90} />
                            </div>
                            <div className="flex items-center justify-center">
                                <div>
                                    <h3 className="text-2xl font-semibold cloud-burst mb-5">Our Vision</h3>
                                    <p className="font-light text-[15px] cloud-burst">To be the leading national cooperative that empowers Filipino online professionals to become digitally competitive, while enabling MSMEs to thrive through responsible digital transformation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl text-center p-5 pt-20 pb-10 relative">
                            <div className="absolute left-1/2 translate-x-[-50%] top-[-45px]">
                                <Image src="/Our-Goal.svg" alt="Our Goal" width={90} height={90} />
                            </div>
                            <div className="flex items-center justify-center">
                                <div>
                                    <h3 className="text-2xl font-semibold cloud-burst mb-5">Our Goal</h3>
                                    <p className="font-light text-[15px] cloud-burst">To build a cooperative digital ecosystem that bridges online professionals and MSMEs, creates ethical and sustainable opportunities, and develops digitally capable leaders and entrepreneurs nationwide.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a href="/about" className="bg-[#F85E00] hover:bg-transparent border border-[#F85E00] text-white hover:text-[#F85E00] transition-colors duration-300 ease-in-out py-2 px-7 font-semibold rounded-3xl inline-block cursor-pointer">Learn More</a>
                    </div>
                </div>
            </div>
        </section>
    )
}