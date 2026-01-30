'use client'
import { useSignupModal } from '@/context/SignupModalContext'
import Image from "next/image";

export default function WhyFopsco() {
    const { open } = useSignupModal()

    return (
        <section className="mx-auto xl:w-4/5 px-5 py-20">
            <div className="w-full xl:w-5/6 mx-auto mb-16 text-center">
                <span className="mb-5 inline-block uppercase text-xs text-[#F85E00] pl-5 relative dot-orange">Why Join FOPSCo?</span>
                <h3 className="text-3xl md:text-4xl mb-5 font-semibold cloud-burst">The Value of Being a FOPSCo Member</h3>
                <p className="text-lg cloud-burst font-light">See how our community can support your growth, career, and success online.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Unlock-Collective-Strength.svg" className="mb-3" alt="Unlock Collective Strength" width={50} height={50} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Unlock Collective Strength</h3>
                        <p className="font-light text-[15px]">Gain access to a nationwide network of Filipino online professionals, trainers, and partners. Together, we share opportunities, knowledge, and resources that no individual freelancer can access alone.</p>
                    </div>
                </div>
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Shape-Your-Future.svg" className="mb-3" alt="Shape Your Future" width={50} height={53} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Shape Your Digital Future</h3>
                        <p className="font-light text-[15px]">As a member-owner, you don’t just participate, you help shape cooperative programs, services, and platforms like CoOp, our safety-by-design automation system for cooperatives and MSMEs.</p>
                    </div>
                </div>
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Share-in-Success.svg" className="mb-3" alt="Share in Success" width={50} height={50} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Share in Success</h3>
                        <p className="font-light text-[15px]">FOPSCo is built on shared growth. Members benefit from cooperative earnings, patronage opportunities, and long-term value created through collective digital services and transformation initiatives.</p>
                    </div>
                </div> 
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Continuous-Learning-and-Growth.svg" className="mb-3" alt="Continuous Learning and Growth" width={50} height={46} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Continuous Learning & Growth</h3>
                        <p className="font-light text-[15px]">Access training, mentoring, and upskilling programs designed to keep members relevant in a rapidly evolving digital landscape.</p>
                    </div>
                </div>
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Build-Meaningful-Connections.svg" className="mb-3" alt="Build Meaningful Connections" width={50} height={50} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Meaningful Connections</h3>
                        <p className="font-light text-[15px]">Build professional relationships grounded in cooperation, trust, and shared purpose, NOT competition.</p>
                    </div>
                </div>
                <div className="px-5 py-10 md:py-20 shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)] rounded-2xl">
                    <div className="w-full">
                        <Image src="/Secure-Your-Future.svg" className="mb-3" alt="Secure Your Future" width={50} height={50} />
                        <h3 className="text-2xl font-semibold cloud-burst mb-5">Secure & Ethical Opportunities</h3>
                        <p className="font-light text-[15px]">Through cooperative governance and safety-by-design systems, members gain access to work and business opportunities that prioritize fairness, accountability, and long-term sustainability.</p>
                    </div>
                </div>                     
            </div>  
            <div className="w-full text-center mt-20">
                <button onClick={open} className="signup-btn bg-[#F85E00] hover:bg-transparent border border-[#F85E00] text-white hover:text-[#F85E00] transition-colors duration-300 ease-in-out py-2 px-7 font-semibold rounded-3xl inline-block cursor-pointer">Join Us Today!</button>
            </div>
        </section>
    )
}