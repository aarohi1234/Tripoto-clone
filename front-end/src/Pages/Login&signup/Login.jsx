import { Alert,
  AlertIcon,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
   
  } from '@chakra-ui/react';
  // import { FcGoogle } from "react-icons/fc";
  import {Fcgoogle} from "./Fcgoogle"
  import { Spinner } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import {siginInwithGoogle} from "./firebase"
import { useState } from 'react';

 
//  import jwt from "jsonwebtoken"
const auth={
    isAuh:false,
    user:" "
}

  export default function Login() {

const [isAuth,setIsAuth] = useState(auth);
const [load,setLoad]=useState(false);
const [respo,setRespo]=useState("")
    let obj={
        email:"",
        password:""
      }
      const [data,setData] = useState(obj);
      console.log(isAuth  )
      console.log(data)

      const OnChange=(e)=>{
      const {value,name}=e.target;
     setData({...data,[name]:value})
      }
  
      const formSubmit = async (e)=>{
      e.preventDefault();
      setLoad(true)
       fetch("http://localhost:8000/users/login",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
  
     }).then((res)=>{
      setLoad(true)
      return res.json()
     }).then((res)=>{
      setLoad(true)
      const {message,token,user } = res;
      console.log(res)
      if(message=="login succesfull"){
        setIsAuth({...isAuth,isAuth:true,user})
        setLoad(false)
        setRespo(res)
        
        console.log( isAuth)
      }else if(message=="Invalid-Creadential"){
        setLoad(false)
        setRespo(res)     
        
               } 
           })
  
           setLoad(false);

           setTimeout(() => {
            setRespo("")
           }, 3000);
      }

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
        
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            {respo.message=="login succesfull"? (
            <Alert bg="green" status="success">
              <AlertIcon />
              Login SucessFull Happy Journey
            </Alert>
          ) : respo.message =="Invalid-Creadential"? (
            <Alert bg="red" status="warning">
              <AlertIcon />
             Check creadential 
            </Alert>
          ) :  null}

          <Button  leftIcon={<Fcgoogle />} onClick={()=>siginInwithGoogle()}>Google login</Button>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' onChange={(e)=>OnChange(e)}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password'  onChange={(e)=>OnChange(e)}/>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.500'}>Forgot password?</Link>
              </Stack>

{load==true ?<Spinner/>:  <Button  type='submit' colorScheme={'blue'} variant={'solid'} onClick={(e)=>formSubmit(e)}>
                      Sign in
                     </Button>}

            
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.pexels.com/photos/4353813/pexels-photo-4353813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          />
        </Flex>
      </Stack>
    );
  }