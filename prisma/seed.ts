import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user with secure credentials
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'defaultpass', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'gaganrai907@gmail.com' },
    update: {},
    create: {
      email: 'gaganrai907@gmail.com',
      password: hashedPassword,
      name: 'Gagan Kumar',
      role: 'admin',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create profile
  const existingProfile = await prisma.profile.findFirst()
  
  const profile = existingProfile || await prisma.profile.create({
    data: {
      name: 'Gagan Kumar',
      title: 'Full Stack Developer',
      bio: 'Passionate full-stack developer with 3+ years of experience building modern web applications. I love creating intuitive user interfaces and robust backend systems.',
      email: 'gaganrai907@gmail.com',
      phone: '+91 9876543210',
      location: 'India',
      website: 'https://gaganportfolio.dev',
      github: 'https://github.com/gagankumar907',
      linkedin: 'https://linkedin.com/in/gagankumar907',
      twitter: 'https://twitter.com/gagankumar907',
    },
  })
  console.log('✅ Created profile for:', profile.name)

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe integration.',
      content: 'This project showcases a complete e-commerce solution with user authentication, product management, shopping cart, and payment processing.',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Stripe']),
      featured: true,
      status: 'completed',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-15'),
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      content: 'Built with React and Node.js, this app helps teams organize their work and track progress in real-time.',
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT']),
      featured: true,
      status: 'completed',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2023-12-20'),
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather and forecasts for multiple cities.',
      content: 'Integration with weather APIs to provide real-time weather information with a clean, intuitive interface.',
      technologies: JSON.stringify(['React', 'JavaScript', 'CSS3', 'Weather API', 'Chart.js']),
      featured: false,
      status: 'completed',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-07-15'),
    },
  ]

  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: projectData,
    })
    console.log('✅ Created project:', project.title)
  }

  // Create sample skills
  const skills = [
    { name: 'React', category: 'frontend', level: 5, icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', category: 'frontend', level: 5, icon: '▲', color: '#000000' },
    { name: 'TypeScript', category: 'frontend', level: 4, icon: '📘', color: '#3178C6' },
    { name: 'Tailwind CSS', category: 'frontend', level: 5, icon: '🎨', color: '#38B2AC' },
    { name: 'JavaScript', category: 'frontend', level: 5, icon: '📜', color: '#F7DF1E' },
    { name: 'HTML5', category: 'frontend', level: 5, icon: '🏗️', color: '#E34F26' },
    { name: 'CSS3', category: 'frontend', level: 5, icon: '🎨', color: '#1572B6' },
    
    { name: 'Node.js', category: 'backend', level: 4, icon: '🟢', color: '#339933' },
    { name: 'Express.js', category: 'backend', level: 4, icon: '🚂', color: '#000000' },
    { name: 'Python', category: 'backend', level: 4, icon: '🐍', color: '#3776AB' },
    { name: 'Django', category: 'backend', level: 3, icon: '🎯', color: '#092E20' },
    
    { name: 'PostgreSQL', category: 'database', level: 4, icon: '🐘', color: '#336791' },
    { name: 'MongoDB', category: 'database', level: 3, icon: '🍃', color: '#47A248' },
    { name: 'Prisma', category: 'database', level: 4, icon: '🔺', color: '#2D3748' },
    { name: 'Redis', category: 'database', level: 3, icon: '🔴', color: '#DC382D' },
    
    { name: 'Git', category: 'tools', level: 4, icon: '🌿', color: '#F05032' },
    { name: 'Docker', category: 'tools', level: 3, icon: '🐳', color: '#2496ED' },
    { name: 'AWS', category: 'tools', level: 3, icon: '☁️', color: '#FF9900' },
    { name: 'Vercel', category: 'tools', level: 4, icon: '▲', color: '#000000' },
  ]

  for (const skillData of skills) {
    const skill = await prisma.skill.create({
      data: skillData,
    })
    console.log('✅ Created skill:', skill.name)
  }

  // Create sample experience
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      description: 'Led development of multiple web applications using React, Node.js, and PostgreSQL. Mentored junior developers and implemented best practices for code quality and deployment.',
      startDate: new Date('2022-01-01'),
      current: true,
      location: 'San Francisco, CA',
      website: 'https://techsolutions.com',
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']),
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      description: 'Developed and maintained e-commerce platform serving 10,000+ users. Implemented payment processing, inventory management, and analytics dashboard.',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      location: 'Remote',
      website: 'https://startupxyz.com',
      technologies: JSON.stringify(['React', 'Express.js', 'MongoDB', 'Stripe']),
    },
    {
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      description: 'Created responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UI/UX designs.',
      startDate: new Date('2019-03-01'),
      endDate: new Date('2020-05-31'),
      current: false,
      location: 'New York, NY',
      website: 'https://digitalagencypro.com',
      technologies: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap']),
    },
  ]

  for (const expData of experiences) {
    const experience = await prisma.experience.create({
      data: expData,
    })
    console.log('✅ Created experience:', experience.position, 'at', experience.company)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
