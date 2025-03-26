import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call | null>(null);
    const [isCallLoading, setIsCallLoading] = useState(true); 

    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client || !id) return;

        let isMounted = true;

        const loadCall = async () => {
            setIsCallLoading(true); 

            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        id: Array.isArray(id) ? id[0] : id, 
                    },
                });

                if (isMounted) {
                    setCall(calls.length > 0 ? calls[0] : null);
                    setIsCallLoading(false);
                }
            } catch (error) {
                console.error("Error fetching call:", error);
                if (isMounted) setIsCallLoading(false);
            }
        };

        loadCall();

        return () => {
            isMounted = false; 
        };
    }, [client, id]);

    return { call, isCallLoading };
};
