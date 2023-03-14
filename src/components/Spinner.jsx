import { ImSpinner10 } from 'react-icons/im';

const Loader = () => {
    return ( 
        <section className='flex justify-center items-center animate-spin text-white w-full'>
            <ImSpinner10 className='h-20 w-20'/>
        </section>
     );
}
 
export default Loader;