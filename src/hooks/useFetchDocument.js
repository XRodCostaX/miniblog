/* eslint-disable no-console */
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    };

    loadDocument();
  }, [docCollection, id]);

  console.log('DOCUMENTS:', document);

  return { document, loading, error };
};
