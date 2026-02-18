"use client";
import { Icon } from "@iconify/react";

const FloatingWhatsApp = () => {
	const phoneNumber = "2347040925563";
	const message = encodeURIComponent(
		"Hi, I'm interested in your media services.",
	);
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

	return (
		<a
			href={whatsappUrl}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce-subtle'
			aria-label='Chat on WhatsApp'
		>
			<Icon icon='mdi:whatsapp' className='w-8 h-8' />
		</a>
	);
};

export default FloatingWhatsApp;
