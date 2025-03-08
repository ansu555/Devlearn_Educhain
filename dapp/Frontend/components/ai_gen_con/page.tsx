"use react"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CoursePage() {
    const router = useRouter();
    const { topic } = router.query;
    const [courseContent, setCourseContent] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!topic) return;

        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/generateCourse", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topic }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch course content");
                }

                const data = await response.json();
                setCourseContent(data.course);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [topic]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Course on {topic}</h1>

            {loading && <p className="text-blue-500">Generating course, please wait...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {courseContent && (
                <div className="p-4 bg-gray-100 border rounded-md">
                    <pre className="whitespace-pre-wrap">{courseContent}</pre>
                </div>
            )}
        </div>
    );
}
