import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Web3Storage } from 'web3.storage'

export default function Home() {
  const [file, setFile] = useState<File>()
  const [fileName, setFileName] = useState("")
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  async function uploadFiles() {
    setLoading(true)
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || "" })
    const blob = new Blob([file || ""], { type: type })
    const cid = await client.put([new File([blob], fileName)])
    if (cid) {
      setLoading(false)
      setLoading(false)
      setUrl(`https://${cid}.ipfs.w3s.link/${fileName}`)
    }
  }
  return (
    <div>
      <Head>
        <title>Filecoin fvm</title>
        <meta name="description" content="filcoin fvm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center justify-center w-screen h-screen'>
        <div>
          <div className='flex'>
            <input type="file"
              placeholder="Select file"
              className='border-y-2 border-l-2 border-black rounded-y-lg rounded-l-lg p-3.5'
              onChange={e => {
                if (e.target.files) {
                  setFile(e.target.files[0])
                  setFileName(e.target.files[0].name)
                  setType(e.target.files[0].type)
                }
              }}
            />
            <button className='w-24 text-white bg-black rounded-r-lg' onClick={async() => uploadFiles()}>{loading ? "Loading..." : "Upload"}</button>
          </div>
          <div>
            <p>Your file is stored <span><Link href={url} className="text-blue-500 hover:underline" onClick={() => console.log(url)}>here</Link></span></p>
          </div>
        </div>
      </main>
    </div>
  )
}