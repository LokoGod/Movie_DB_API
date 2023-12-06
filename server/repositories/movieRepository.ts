import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const allMovies = async () => {
  return prisma.movie.findMany();
};

const postMovie = async (data: any) => {
  return prisma.movie.create({
    data: {
      title: data.title,
      genre: {
        create: data.genreIds.map((id: any) => ({ genreId: id })),
      },
      director: {
        create: data.directorIds.map((id: any) => ({ directorId: id })),
      },
      cast: {
        create: data.castIds.map((id: any) => ({ castId: id })),
      },
    },
    include: {
      genre: true,
      director: true,
      cast: true,
    },
  });
};

const specificMovie = async (id: number) => {
  return prisma.movie.findUnique({ where: { id: id } });
};

const movieRepository = { allMovies, postMovie, specificMovie };
export default movieRepository;
