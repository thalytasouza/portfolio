import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { FaGithub, FaLinkedin, FaGooglePlay } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import {MainPageFace, MainContent, ProjectsSection, Project, AboutSection, ContactSection, MobileMenu} from "~/styled/home"
import { useRouter } from 'next/router'
import { ChangeY } from "~/actions/indexActions"
import EventDispatcher from '~/utils/analytics/analyticsUtils'

export async function getStaticProps({ locale }) {
  let description = locale == "en-US" ? "iOS Developer" : "Desenvolvedora iOS"
  let about = locale == "en-US" ? "About me" : "Sobre Mim"
  let projects = locale == "en-US" ? "Projects" : "Projetos"
  let contact = locale == "en-US" ? "Contact" : "Contato"
  let resume = locale == "en-US" ? "Resume" : "Currículo"
  let check = locale == "en-US" ? "Check my Projects" : "Veja meus Projetos"
  let about_title = locale == "en-US" ? "Hey, I'm Thalyta" : "Olá, eu sou a Thalyta"
  let about_desc_one = locale == "en-US" ? "I'm an iOS Developer passionate about finding new ways to improve my projects in order always deliver a beautiful product." : "Eu sou uma desenvolvedora de aplicativos para iOS apaixonada por encontrar novas maneiras de melhorar meus projetos, com o foco em sempre entregar um produto de qualidade."
  let about_desc_two = locale == "en-US" ? "Since I came across mobile development, specifically for iOS, I couldn't help but fall completely in love with the stack, giving me more and more motivation to improve myself as a developer." : "Desde que me deparei com o desenvolvimento mobile, mais especificamente para iOS, náo tive como náo me apaixonar completamente pela stack, me dando cada vez mais motivação para poder me aperfeiçoar como desenvolvedora."
  let latest = locale == "en-US" ? "Latest Projects" : "Últimos Projetos"
  let finn_desc = locale == "en-US" ? "Collection of Forums (Social Media)" : "Mídia Social baseada em Fóruns"
  let amazingnote_desc = locale == "en-US" ? "Note App" : "Aplicativo de Notas"
  let checkMe = locale == "en-US" ? "Check me out!" : "Me Encontre"
  let access = locale == "en-US" ? "Access" : "Acessar"
  let resume_link = locale == "en-US" ? "resume" : "curriculo"
  let finnbackend_desc = locale == "en-US" ? "Backend for Finn app" : "Backend para o app Finn"
  return {
    props: {
      description,
      about,
      projects,
      contact,
      resume,
      check,
      about_title,
      about_desc_one,
      about_desc_two,
      latest,
      finn_desc,
      amazingnote_desc,
      checkMe,
      access,
      resume_link,
      finnbackend_desc
    },
  }
}

function Home(props) {
  let router = useRouter()

  const pageYOffset = useSelector(state => state.pageYOffset)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: pageYOffset
    })
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault()
        const href = event.target.href.split('#', 2)[1]
        const element = document.getElementById(href)
        window.scroll({
          behavior: "smooth",
          top: href === "about" ? element.offsetTop - 150 : element.offsetTop
        })
      })
    })
    document.querySelectorAll('.projectAnchor').forEach(anchor => {
      anchor.addEventListener('click', (event) => {
        dispatch(ChangeY(window.pageYOffset))
      })
    })
  }, [])

  function getResumeLink(isMobile) {
    return props.resume_link == "resume" ?
    <a href="./resume.pdf" target="_blank" onClick={ () => EventDispatcher.logSelectContent(isMobile == true ? 'header_btn_mobile' : 'header_btn', 'resume_us') } >{props.resume}</a>
  : <a href="./curriculo.pdf" target="_blank" onClick={ () => EventDispatcher.logSelectContent(isMobile == true ? 'header_btn_mobile' : 'header_btn', 'resume_br') }>{props.resume}</a>;
  }

  return (
    <motion.div 
      exit={{opacity: 0}} 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      <Head>
        <title>Thalyta Souza</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main>
        <MobileMenu className="mobileMenu">
          <RiCloseLine className="closeMenuBtn" size={45} />
          <ul>
            <li><a href='#about' onClick={ () => EventDispatcher.logSelectContent('header_btn_mobile', 'about_me') }>{props.about}</a></li>
            <li><a href='#projects' onClick={ () => EventDispatcher.logSelectContent('header_btn_mobile', 'projects') }>{props.projects}</a></li>
            <li><a href='#contact' onClick={ () => EventDispatcher.logSelectContent('header_btn_mobile', 'contact') }>{props.contact}</a></li>
            <li><a href="https://medium.com/@eduardofelipi" target="_blank" onClick={ () => EventDispatcher.logSelectContent('header_btn_mobile', 'blog') }>Blog</a></li>
            <li><span>{getResumeLink(true)}</span></li>
          </ul>
        </MobileMenu>
        <MainPageFace background="/background.svg">
          <div className="header">
            <ul>
            <li><a href='#about' onClick={ () => EventDispatcher.logSelectContent('header_btn', 'about_me') }>{props.about}</a></li>
            <li><a href='#projects' onClick={ () => EventDispatcher.logSelectContent('header_btn', 'projects') }>{props.projects}</a></li>
            <li><a href='#contact' onClick={ () => EventDispatcher.logSelectContent('header_btn', 'contact') }>{props.contact}</a></li>
            <li><a href="https://medium.com/@eduardofelipi" target="_blank" onClick={ () => EventDispatcher.logSelectContent('header_btn', 'blog') }>Blog</a></li>
            <li><span>{getResumeLink()}</span></li>
            </ul>
            <GiHamburgerMenu className="hambMenuBtn" size={36}/>
          </div>
          <MainContent>
            <div className="contentLeft">
              <div className="container">
                <h1>Thalyta Souza</h1>
                <h2>{props.description}</h2>
                <a href="#projects" onClick={ () => EventDispatcher.logSelectContent('cta_btn', 'check_my_projects') }>{props.check}</a>
              </div>
            </div>
            <div className="contentRight">
              <div className="container">
                <div className="block blockOne"><a href="https://github.com/edufelip" target="_blank" onClick={ () => EventDispatcher.logSelectContent('cta_btn', 'github') }><FaGithub size={35} /></a></div>
                <div className="block blockTwo"><a href="https://www.linkedin.com/in/eduardo-felipe-5593221a5/" target="_blank" onClick={ () => EventDispatcher.logSelectContent('cta_btn', 'linkedin') }><FaLinkedin size={35} /></a></div>
                <div className="block blockThree"><a href="mailto:eduardofelipi@gmail.com" onClick={ () => EventDispatcher.logSelectContent('cta_btn', 'e-mail') }><MdEmail size={35} /></a></div>
              </div>  
            </div>
          </MainContent>
        </MainPageFace>
        <AboutSection id="about">
          <h2>{props.about_title}</h2>
          <p>{props.about_desc_one}</p>
          <div className="bar"></div>
          <p>{props.about_desc_two}</p>
        </AboutSection>
        <ProjectsSection id="projects">
          <h2>{props.latest}</h2>
          <Project className="amazing-note" background="/amazingnote-bg.svg">
            <div className="shadow">
              <div className="wrap">
                <h2>Amazing Note</h2>
                <p>{props.amazingnote_desc}</p>
                <div>
                  <Link scroll={false} href="/projects/amazing-note">
                    <a className="projectAnchor" onClick={ () => EventDispatcher.logSelectContent('project_btn', 'details_amazing_note') }>{props.access}</a>
                  </Link>
                  <a href="https://github.com/edufelip/amazing-note" target="_blank" onClick={ () => EventDispatcher.logSelectContent('project_btn', 'github_amazing_note') }><FaGithub size="24"/></a>
                  <a href="https://play.google.com/store/apps/details?id=com.edufelipe.amazing_note" target="_blank"  onClick={ () => EventDispatcher.logSelectContent('project_btn', 'playstore_amazing_note') }><FaGooglePlay size="24"/></a>
                </div>
              </div>
            </div>
          </Project>
          <Project className="finn" background="/finn-bg.svg">
            <div className="shadow">
              <div className="wrap">
                <h2>Finn</h2>
                <p>{props.finn_desc}</p>
                <div>
                  <Link scroll={false} href="/projects/finn">
                    <a className="projectAnchor"  onClick={ () => EventDispatcher.logSelectContent('project_btn', 'details_finn') }>{props.access}</a>
                  </Link>
                  <a href="https://www.github.com/edufelip/finn" target="_blank" onClick={ () => EventDispatcher.logSelectContent('project_btn', 'github_finn') }><FaGithub size="24"/></a>
                  <a href="http://play.google.com/store/apps/details?id=com.projects.finn" target="_blank"  onClick={ () => EventDispatcher.logSelectContent('project_btn', 'playstore_finn') }><FaGooglePlay size="24"/></a>
                </div>
              </div>
            </div>
          </Project>
          <Project className="finn-backend" background="/finnbackend-bg.svg">
            <div className="shadow">
              <div className="wrap">
                <h2>Finn Backend</h2>
                <p>{props.finnbackend_desc}</p>
                <div>
                  <Link scroll={false} href="/projects/finn-backend">
                    <a className="projectAnchor" onClick={ () => EventDispatcher.logSelectContent('project_btn', 'details_finn_backend') }>{props.access}</a>
                  </Link>
                  <a href="https://github.com/edufelip/finn__backend" target="_blank" onClick={ () => EventDispatcher.logSelectContent('project_btn', 'github_finn_backend') }><FaGithub size="24"/></a>
                </div>
              </div>
            </div>
          </Project>
        </ProjectsSection>
        <ContactSection id="contact">
          <h2>{props.checkMe}!</h2>
          <div className="bundle">
            <a href="https://github.com/thalytasouza" target="_blank" onClick={ () => EventDispatcher.logSelectContent('bottom_nav_btn', 'github') }>Github</a>
            <a href="https://www.linkedin.com/in/mayerflot/" target="_blank" onClick={ () => EventDispatcher.logSelectContent('bottom_nav_btn', 'linkedin') }>Linkedin</a>
            <a href="https://medium.com/@mayerflot" target="_blank" onClick={ () => EventDispatcher.logSelectContent('bottom_nav_btn', 'blog') }>Blog</a>
          </div>
          <p>©2023 Thalyta Souza - mayerflot@gmail.com</p>
        </ContactSection>
      </main>
    </motion.div>
  )
}

export default (Home);
