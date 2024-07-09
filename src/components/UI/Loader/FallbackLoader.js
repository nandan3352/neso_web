import NesoLoader from "../LoadingIcon/NesoLoader"

const FallbackLoader = () => {
    const isDarkMode = (localStorage.getItem('neso-dark-theme') === 'dark')
    return (<div style={{ background: isDarkMode ? '#121212' : '#FFFFFF', height: '100vh', display: 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
        <NesoLoader />
    </div>)
}

export default FallbackLoader