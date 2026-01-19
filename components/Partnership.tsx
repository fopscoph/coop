'use client'
import { useSignupModal } from '@/context/SignupModalContext'

export default function Partnerships() {
    const { open } = useSignupModal()

    return (
        <section className="bg-cloud-burst px-5 py-20">
            <div className="flex flex-col md:flex-row w-full xl:w-4/5 mx-auto space-y-5 xl:space-y-0">
                <div className="w-full xl:w-7/12 mx-auto">
                    <span className="mb-5 block uppercase text-xs text-[#F85E00]">Partnership</span>
                    <h3 className="text-3xl font-semibold text-white">Be part of the first and only cooperative<br /> for Filipino Online Professionals</h3>
                </div>
                <div className="w-full xl:w-5/12 mx-auto flex justify-center xl:justify-end items-center">
                    <button onClick={open} className="signup-btn text-xl bg-[#F85E00] hover:bg-transparent border border-[#F85E00] text-white hover:text-[#F85E00] transition-colors duration-300 ease-in-out py-2 px-7 font-semibold rounded-3xl inline-block cursor-pointer">Join Us Today!</button>
                </div>
            </div>
        </section>
    )
}