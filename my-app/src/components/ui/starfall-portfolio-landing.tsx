import React from 'react';
// --- TYPE DEFINITIONS FOR PROPS ---
interface NavLink { label: string; href: string; }
interface Project { title: string; description: string; tags: string[]; imageContent?: React.ReactNode; }
interface Stat { value: string; label: string; }
export interface PortfolioPageProps {
  logo?: { initials: React.ReactNode; name: React.ReactNode; };
  navLinks?: NavLink[];
  resume?: { label: string; onClick?: () => void; };
  hero?: { titleLine1: React.ReactNode; titleLine2Gradient: React.ReactNode; subtitle: React.ReactNode; };
  ctaButtons?: { primary: { label: string; onClick?: () => void; }; secondary: { label: string; onClick?: () => void; }; };
  projects?: Project[];
  stats?: Stat[];
}
// --- DEFAULT DATA ---
const defaultData: Required<PortfolioPageProps> = {
  logo: { initials: 'MT', name: 'Meng To' },
  navLinks: [ { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Skills', href: '#skills' } ],
  resume: { label: 'Resume', onClick: undefined },
  hero: { titleLine1: 'Creative Developer &', titleLine2Gradient: 'Digital Designer', subtitle: 'I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.', },
  ctaButtons: { primary: { label: 'View My Work', onClick: undefined }, secondary: { label: 'Get In Touch', onClick: undefined }, },
  projects: [ { title: 'FinTech Mobile App', description: 'React Native app with AI-powered financial insights.', tags: ['React Native', 'Node.js'], imageContent: null }, { title: 'Data Visualization Platform', description: 'Interactive dashboard for complex data analysis.', tags: ['D3.js', 'Python'], imageContent: null }, { title: '3D Portfolio Site', description: 'Immersive WebGL experience with 3D elements.', tags: ['Three.js', 'WebGL'], imageContent: null }, ],
  stats: [ { value: '50+', label: 'Projects Completed' }, { value: '5+', label: 'Years Experience' }, { value: '15+', label: 'Happy Clients' }, ],
};
// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
const PortfolioPage: React.FC<PortfolioPageProps> = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
}) => {
  return (
    <div className="bg-background text-foreground geist-font">
      <div className="relative">
        <nav className="w-full px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-border backdrop-blur-md border border-border flex items-center justify-center">
                        <span className="geist-font text-sm font-bold text-foreground">{logo.initials}</span>
                    </div>
                    <span className="geist-font text-lg font-medium text-foreground">{logo.name}</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors inter-font text-sm">{link.label}</a>
                    ))}
                </div>
                <button onClick={resume.onClick} className="glass-button px-4 py-2 rounded-lg text-foreground text-sm font-medium inter-font">{resume.label}</button>
            </div>
        </nav>
        <div className="divider" />
        <main id="about" className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8 float-animation">
                    <h1 className="md:text-6xl lg:text-7xl leading-[1.1] geist-font text-5xl font-light text-foreground tracking-tight mb-4">
                        {hero.titleLine1}
                        <span className="gradient-text block tracking-tight">{hero.titleLine2Gradient}</span>
                    </h1>
                    <p className="md:text-xl max-w-3xl leading-relaxed inter-font text-lg font-light text-muted-foreground mx-auto">{hero.subtitle}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <button onClick={ctaButtons.primary.onClick} className="primary-button px-6 py-3 text-foreground rounded-lg font-medium text-sm min-w-[160px]">{ctaButtons.primary.label}</button>
                    <button onClick={ctaButtons.secondary.onClick} className="glass-button min-w-[160px] inter-font text-sm font-medium text-foreground rounded-lg px-6 py-3">{ctaButtons.secondary.label}</button>
                </div>
                <div className="divider mb-16" />
                <div id="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
                    {projects.map((project, index) => (
                        <div key={index} className="glass-card rounded-2xl p-6 text-left">
                            <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center">{project.imageContent}</div>
                            <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">{project.title}</h3>
                            <p className="text-muted-foreground text-sm inter-font mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="skill-badge px-2 py-1 rounded text-xs text-muted-foreground">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="divider mb-16" />
                <div id="skills" className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
                    {stats.map((stat, index) => (
                        <React.Fragment key={stat.label}>
                            <div>
                                <div className="text-3xl md:text-4xl font-light text-foreground mb-1 geist-font tracking-tight">{stat.value}</div>
                                <div className="text-muted-foreground text-sm inter-font font-normal">{stat.label}</div>
                            </div>
                            {index < stats.length - 1 && <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-input to-transparent" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};
export {PortfolioPage};
