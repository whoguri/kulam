import React from 'react'
import Users from '../../components/Users'
import { APP_NAME } from '@/constents/constArray';

export const metadata = {
    title: `Users | ${APP_NAME}`, description: "",
};

function UsersPage() {
    return (<Users />)
}

export default UsersPage
