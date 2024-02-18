import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout';

function Profile() {
    const { uid } = useParams();
    return (
        <Layout>
            <div>{uid}</div>
        </Layout>
    )
}

export default Profile