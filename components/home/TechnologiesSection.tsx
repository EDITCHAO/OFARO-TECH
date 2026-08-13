"use client";

import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiLaravel,
  SiDjango,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiFigma,
  SiTypescript,
  SiPython,
  SiPhp,
  SiGit
} from "react-icons/si";
import { FaMobileAlt, FaAws, FaPaintBrush } from "react-icons/fa";

export default function TechnologiesSection() {
  const technologies = {
    frontend: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
      { name: "Vue.js", icon: <SiVuedotjs />, color: "#4FC08D" },
      { name: "Angular", icon: <SiAngular />, color: "#DD0031" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" }
    ],
    backend: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      { name: "Django", icon: <SiDjango />, color: "#092E20" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "PHP", icon: <SiPhp />, color: "#777BB4" }
    ],
    mobile: [
      { name: "Flutter", icon: <SiFlutter />, color: "#02569B" },
      { name: "React Native", icon: <FaMobileAlt />, color: "#61DAFB" }
    ],
    database: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" }
    ],
    devops: [
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
      { name: "AWS", icon: <FaAws />, color: "#FF9900" },
      { name: "Git", icon: <SiGit />, color: "#F05032" }
    ],
    design: [
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      { name: "Photoshop", icon: <FaPaintBrush />, color: "#31A8FF" }
    ]
  };

  const categories = [
    { key: "frontend", label: "Frontend", color: "from-blue-500 to-cyan-500" },
    { key: "backend", label: "Backend", color: "from-green-500 to-emerald-500" },
    { key: "mobile", label: "Mobile", color: "from-purple-500 to-pink-500" },
    { key: "database", label: "Bases de données", color: "from-orange-500 to-red-500" },
    { key: "devops", label: "DevOps & Cloud", color: "from-indigo-500 to-blue-500" },
    { key: "design", label: "Design", color: "from-pink-500 to-rose-500" }
  ];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Technologies
          </div>
          <h2 className="heading-2 mb-4">
            Les technologies que nous maîtrisons
          </h2>
          <p className="text-body">
            Nous utilisons les technologies les plus modernes et performantes pour créer des solutions innovantes
          </p>
        </div>

        {/* Technologies by Category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.key}>
              {/* Category Title */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent inline-block`}>
                  {category.label}
                </h3>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {technologies[category.key as keyof typeof technologies].map((tech, index) => (
                  <div
                    key={index}
                    className="group bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      {/* Icon */}
                      <div
                        className="text-5xl transition-transform group-hover:scale-110"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>

                      {/* Name */}
                      <div className="font-semibold text-text group-hover:text-primary transition-colors">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark text-white p-8 md:p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">
            Toujours à la pointe de l'innovation
          </h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
            Notre équipe se forme continuellement aux dernières technologies pour vous garantir des solutions performantes et pérennes
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/services" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Découvrir nos services
            </a>
            <a href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
