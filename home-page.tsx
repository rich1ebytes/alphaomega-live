"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Paintbrush, Globe, Menu, X, ChevronDown } from "lucide-react"
import emailjs from '@emailjs/browser'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const navItems = [
    { name: 'Home', ref: homeRef },
    { name: 'About Us', ref: aboutRef },
    { name: 'Services', ref: servicesRef },
    { name: 'Contact', ref: contactRef }
  ]

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const services = [
    {
      title: "Brand Identity & Logo Design",
      description: "Creating memorable and impactful brand identities that resonate with your audience.",
      icon: <Paintbrush className="h-10 w-10 text-purple-700" />,
      details: "Our brand identity and logo design service helps businesses establish a strong visual presence. We create unique, memorable logos and comprehensive brand guidelines that ensure consistency across all touchpoints."
    },
    {
      title: "Website & App Design",
      description: "Designing user-friendly and visually appealing websites and applications.",
      icon: <Globe className="h-10 w-10 text-purple-700" />,
      details: "We design responsive websites and intuitive mobile applications that not only look great but also provide an excellent user experience. Our designs are tailored to meet your specific business goals and user needs."
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      )
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      form.reset()
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact us directly.')
      console.error('EmailJS error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-900">
      <header className="bg-purple-700 text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alphomegalogo-zYYT4jr0fF7uOT6ZaALcoeYZY8Gmwa.jpeg"
              alt="Alpha Omega Artworks Logo"
              width={50}
              height={50}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">Alpha Omega Artworks</h1>
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button onClick={() => scrollToSection(item.ref)} className="hover:text-yellow-300 transition-colors">
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-white" />
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="bg-purple-600 text-white py-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button onClick={() => scrollToSection(item.ref)} className="hover:text-yellow-300 transition-colors">
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section ref={homeRef} className="py-20 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Crafting Artistic Experiences
            </motion.h2>
            <motion.p 
              className="mb-8 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We bring your creative visions to life with cutting-edge design and artistry
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" variant="secondary" onClick={() => scrollToSection(contactRef)} className="bg-yellow-400 text-purple-800 hover:bg-yellow-300">
                Let's Create Together
              </Button>
            </motion.div>
          </div>
        </section>

        <section ref={aboutRef} className="py-16 bg-white dark:bg-purple-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-800 dark:text-yellow-300">About Us</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-purple-700 dark:text-purple-200 mb-6">
                Alpha Omega Artworks is a creative studio dedicated to bringing your artistic visions to life. With our team of skilled designers and artists, we transform ideas into stunning visual realities.
              </p>
              <p className="text-purple-700 dark:text-purple-200">
                From brand identities to custom artwork, we're passionate about creating unique, impactful designs that resonate with your audience and elevate your brand.
              </p>
            </div>
          </div>
        </section>

        <section ref={servicesRef} className="py-16 bg-purple-100 dark:bg-purple-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-purple-800 dark:text-yellow-300">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveService(activeService === index ? null : index)}
                >
                  <Card className="cursor-pointer bg-white dark:bg-purple-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4 text-purple-700 dark:text-yellow-300">
                        {service.icon}
                        <span>{service.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-600 dark:text-purple-200">{service.description}</p>
                      <AnimatePresence>
                        {activeService === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 text-sm text-purple-600 dark:text-purple-200"
                          >
                            {service.details}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div
                        animate={{ rotate: activeService === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex justify-center"
                      >
                        <ChevronDown className="text-purple-500 dark:text-yellow-400" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactRef} className="py-16 bg-purple-200 dark:bg-purple-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-purple-800 dark:text-yellow-300">Get in Touch</h2>
            <p className="mb-8 text-purple-700 dark:text-purple-200">Ready to start your project? We're here to help bring your vision to life.</p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-purple-700 hover:bg-purple-600 text-white" onClick={() => setIsModalOpen(true)}>
                Contact Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Alpha Omega Artworks. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-yellow-300 hover:text-yellow-100 mx-2 transition-colors">Privacy Policy</a>
            <a href="#" className="text-yellow-300 hover:text-yellow-100 mx-2 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-purple-900 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-yellow-300">Contact Us</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="h-6 w-6 text-purple-800 dark:text-yellow-300" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-purple-800 dark:text-yellow-300">Name</label>
                  <Input id="name" name="name" placeholder="Your name" required className="bg-purple-50 dark:bg-purple-800 border-purple-300 dark:border-purple-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-purple-800 dark:text-yellow-300">Email</label>
                  <Input id="email" name="email" type="email" placeholder="Your email" required className="bg-purple-50 dark:bg-purple-800 border-purple-300 dark:border-purple-600" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-purple-800 dark:text-yellow-300">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message" required className="bg-purple-50 dark:bg-purple-800 border-purple-300 dark:border-purple-600" />
                </div>
                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-600 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" />
    </div>
  )
}
