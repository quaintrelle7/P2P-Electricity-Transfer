// import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { signIn, useSession } from 'next-auth/react'
// import { useAccount, useSignMessage, useNetwork } from 'wagmi'
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'
// import axios from 'axios'
// import React from 'react';

// function SignIn() {
//   const { isConnected, address } = useAccount()
//   const { chain } = useNetwork()
//   const { status } = useSession()
//   const { signMessageAsync } = useSignMessage()
//   const { push } = useRouter()

//   useEffect(() => {
//     const handleAuth = async () => {
//       const userData = { address, chain: chain.id, network: 'evm' }

//       const { data } = await axios.post('./api/auth/request-message', userData, {
//         headers: {
//         //   'content-type': 'application/json',
//           'Content-Type': 'application/json'
//         },
//       })

//       const message = data.message

//       const signature = await signMessageAsync({ message })

//       // redirect user after success authentication to '/user' page
//       const { url } = await signIn('credentials', {
//         message,
//         signature,
//         redirect: false,
//         callbackUrl: '/user',
//       })
//       /**
//        * instead of using signIn(..., redirect: "/user")
//        * we get the url from callback and push it to the router to avoid page refreshing
//        */
//       push(url)
//     }
//     if (status === 'unauthenticated' && isConnected) {
//       handleAuth()
//     }
//   }, [status, isConnected])

//   return (
//     <div >
     
//       <ConnectButton/>
//     </div>
//   )
// }

// export default SignIn