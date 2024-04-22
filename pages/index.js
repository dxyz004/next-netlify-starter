import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import CubeWireframe from '@components/CubeFrame'
import ParticleRing from '@components/ParticleRing'
import MobiusStrip from '../components/MobiusStrip'

export default function Home() {
  return (
    <article className="helvetica pb4">
      <header className="vh-100 bg-black dt w-100">
        <CubeWireframe />
        <div className="absolute w-100 tc" style={{top: '50%', transform: 'translateY(-50%)'}}>
        <a class="link white f3 dib mr3" href="https://www.youtube.com/watch?v=pP1uswAwZi4" target="_blank" rel="noopener noreferrer">Demo Video</a>
        <a class="link white f3 dib mr3" href="https://github.com/dxyz004" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="link white f3 dib mr3" href="https://danielsnotes.net/blog" target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      </header>
    </article>
  )
}