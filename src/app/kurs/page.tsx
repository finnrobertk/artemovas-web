import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const coursesQuery = groq`*[_type == "course"] | order(startDate asc) {
  _id,
  title,
  description,
  price,
  duration,
  startDate,
  endDate,
  maxParticipants,
  "imageUrl": image.asset->url,
  content,
  requirements
}`;

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  imageUrl: string;
  content: string[];
  requirements: string[];
}

export default async function CoursesPage() {
  const courses = await client.fetch<Course[]>(coursesQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-default mb-8">Våre kurs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-accent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {course.imageUrl && (
              <div className="relative h-48">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-primary-default mb-2">
                {course.title}
              </h2>
              <p className="text-text-default/80 mb-4">{course.description}</p>
              
              <div className="bg-accent-default/20 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-default">Duration:</span>
                  <span className="text-text-default">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-default">Price:</span>
                  <span className="text-secondary-default font-semibold">
                    {course.price} kr
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-default">Start Date:</span>
                  <span className="text-text-default">
                    {new Date(course.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-default">Max Participants:</span>
                  <span className="text-text-default">{course.maxParticipants}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary-default mb-2">
                  Course Content
                </h3>
                <ul className="list-disc list-inside text-text-default/80">
                  {course.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-default mb-2">
                  Requirements
                </h3>
                <ul className="list-disc list-inside text-text-default/80">
                  {course.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <Link
                href="/kontakt"
                className="block w-full text-center bg-primary-default text-white px-6 py-3 rounded-lg hover:bg-primary-default/90 transition-colors"
              >
                Contact Us to Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 