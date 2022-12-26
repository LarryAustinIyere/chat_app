import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = doc(db, "chats", "user.uid").where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt("Please enter an email address for the user you want to chat with");

        if (!input) return null;

        if (EmailValidator.validate(input) && input !== user.email) {
            // we need to add the chat into thr DB 'chats'collection
            const docRef = doc(db, "chats", "user.uid");
            const data = {
                users: [user.email, input]
            }
            setDoc(docRef, data)
                .then(() => {
                    console.log("Document has been added successfully");
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    const cahtAlreadyExists = (recipientEmail) => {
        chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)?.lenght > 0
        );
    };

    return (
        <Container>
            <Header>
                <UserAvater onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder='Search in chats' />
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

            {/* List of chats */}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`

`;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;

const SidebarButton = styled(Button)`
width: 100%;
&&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
`;

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
z-index: 1;
background-color: white;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvater = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}
`;

const IconsContainer = styled.div`

`;
