import qs from "qs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BasePageProps } from "@/types";

import { TProject } from "../../types";
import { Project } from "./components";

export async function generateMetadata({
  params: { locale, slug },
}: PageProps): Promise<Metadata> {
  const project = await getProject({ slug, locale });
  return {
    title: project.attributes.name,
    description: project.attributes.description.substring(
      0,
      Math.min(100, project.attributes.description.length)
    ),
    alternates: {
      canonical: `${locale}/projects/${slug}`,
    },
  };
}

type PageProps = {
  params: { slug: string };
} & BasePageProps;

type TResponse = {
  data: Array<TProject>;
};

export default async function Page({ params: { slug, locale } }: PageProps) {
  const project = await getProject({ slug, locale });
  return <Project project={project} />;
}

async function getProject({ slug, locale }: { locale: string; slug: string }) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        coordinates: true,
        amenities: true,
        nearbyPOI: true,
        images: true,
        properties: {
          populate: {
            property_type: true,
            currency: true,
          },
        },
      },
      locale,
    },
    { encode: false }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects/?&${query}`,
    {
      cache: "no-store",
    }
  );

  const { data: projects } = (await response.json()) as TResponse;
  if (projects.length < 1) notFound();
  return projects[0];
}
