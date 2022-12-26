import { Circle } from 'better-react-spinkit';

const Loading = () => {
    return (
        <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <img
                    src='https://i.ibb.co/qm0JQvt/photo-1614680376739-414d95ff43df-ixlib-rb-4-0.jpg'
                    alt='Logo'
                    style={{ marginBottom: 10 }}
                    height={200}
                />
                <Circle color='#000080' size={60} />
            </div>
        </center>
    );
}

export default Loading;
