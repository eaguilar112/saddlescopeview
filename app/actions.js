'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'; 

// Fetch all animals from the database
export const getAnimals = async () => {
  try {
    const animals = await prisma.animal.findMany();
    return animals;
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
};

// Fetch all exhibits from the database
export const getExhibits = async () => {
  try {
    const exhibits = await prisma.exhibit.findMany();
    return exhibits;
  } catch (error) {
    console.error('Error fetching exhibits:', error);
    return [];
  }
};

// Create a new animal entry in the database
export const createAnimal = async ({
  name,
  scientificName,
  exhibit,
  location,
  funFact,
  imageUrl,
}) => {
  if (!name) {
    throw new Error('Name is required');
  }
  try {
    const animal = await prisma.animal.create({
      data: {
        name,
        scientificName,
        exhibit,
        location,
        funFact,
        imageUrl,
      },
    });
    return animal;
  } catch (error) {
    console.error('Error creating animal:', error);
    throw error;
  }
};

// Create a new exhibit entry in the database
export const createExhibit = async ({ exhibitName, description }) => {
  if (!exhibitName) {
    throw new Error('Exhibit name is required');
  }
  try {
    const exhibit = await prisma.exhibit.create({
      data: {
        exhibitName,
        description,
      },
    });
    return exhibit;
  } catch (error) {
    console.error('Error creating exhibit:', error);
    throw error;
  }
};

// Update an existing animal entry in the database
export const updateAnimal = async ({
  id,
  name,
  scientificName,
  exhibit,
  location,
  funFact,
  imageUrl,
}) => {
  try {
    const animal = await prisma.animal.update({
      where: { id },
      data: {
        name,
        scientificName,
        exhibit,
        location,
        funFact,
        imageUrl,
      },
    });
    return animal;
  } catch (error) {
    console.error('Error updating animal:', error);
    throw error;
  }
};

// Delete an animal entry from the database
export const deleteAnimal = async (id) => {
  try {
    const deleted = await prisma.animal.delete({
      where: { id },
    });
    return deleted;
  } catch (error) {
    console.error('Error deleting animal:', error);
    throw error;
  }
};

// Search for animals by name
export const getAnimalsByName = async (search) => {
  try {
    const animals = await prisma.animal.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return animals;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

// Search for exhibits by name
export const getExhibitsByName = async (search) => {
  try {
    const exhibits = await prisma.exhibit.findMany({
      where: {
        exhibitName: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return exhibits;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

// Admin login: validates credentials and sets a cookie
export async function adminLogin({ username, password }) {
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    cookies().set('admin-auth', 'true', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    });
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
}

// Check if the current user is an admin
export async function isAdmin() {
  const adminCookie = cookies().get('admin-auth');
  return adminCookie?.value === 'true';
}

// Admin logout: deletes the admin-auth cookie
export async function adminLogout() {
  cookies().delete('admin-auth');
}
