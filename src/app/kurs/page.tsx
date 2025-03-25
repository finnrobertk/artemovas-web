import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/sanity/types";

const coursesQuery = groq`
  *[_type == "course"] {
    _id,
    title,
    description,
    duration,
    price,
    image {
      asset-> {
        url
      }
    }
  } | order(title asc)
`;

export default async function CoursesPage() {
  const courses = await client.fetch<Course[]>(coursesQuery);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Våre Kurs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={course.image.asset.url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  {course.title}
                </h2>
                <p className="text-text mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-text">
                  <span>Varighet: {course.duration}</span>
                  <span className="font-semibold text-secondary">
                    {course.price} kr
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Interessert i å lære mer?
          </h2>
          <Link
            href="/kontakt"
            className="btn-primary text-lg px-8 py-3 rounded-full"
          >
            Kontakt oss for mer informasjon
          </Link>
        </div>
      </div>
    </div>
  );
} 