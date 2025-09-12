import { Globe } from "@/components/magicui/globe";
import { Mail, Github, Linkedin, Twitter, Heart } from "lucide-react";
import React from "react";

const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your-email@example.com", // Replace with your email
      color: "hover:text-blue-500",
      description: "Drop me a line",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourusername", // Replace with your GitHub
      color: "hover:text-gray-700 dark:hover:text-gray-300",
      description: "Check out my code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourprofile", // Replace with your LinkedIn
      color: "hover:text-blue-600",
      description: "Let's connect professionally",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/yourusername", // Replace with your Twitter
      color: "hover:text-blue-400",
      description: "Follow my thoughts",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative pt-20 pb-16">
        <div className="text-center px-4">
          <h1 className="bg-gradient-to-b from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-6xl md:text-7xl font-bold mb-4" >
            Let's Connect
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            I'm always excited to collaborate on new projects and meet fellow
            developers. Reach out and let's create something amazing together!
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`p-4 rounded-full bg-gray-50 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300 ${link.color}`}
                  >
                    <IconComponent size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {link.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {link.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="py-12">
        {/* Special Thanks Section (centered) */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-bold">
            Special thanks to Magical UI for providing beautiful UI components
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
