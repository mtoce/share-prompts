'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {useRouter } from 'next/navigation';

import Form from '@components/Form';

const createPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const CreatePrompt = async (event) => {

    };

    return (
        <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        
        />
  )
}

export default createPrompt