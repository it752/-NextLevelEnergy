import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '9grbh5qy',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-10',
});

const teamMembers = [
	{
		id: 'katarzyna',
		name: 'Katarzyna Bilska',
		role: 'Dyrektor Backoffice',
		imagePath: '../src/assets/team/Katarzyna.png',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.',
		email: 'k.bilska@nextlevelenergy.pl',
		phone: '+48 123 456 789',
		linkedin: '#',
		stats: { ovr: 96, pac: 85, sho: 90, pas: 98, dri: 92, def: 88, phy: 80 }
	},
	{
		id: 'kacper',
		name: 'Kacper Król',
		role: 'CEO - założyciel, prezes firmy',
		imagePath: '../src/assets/team/Kacper.png',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus. Ut interdum tellus elit sed risus. Maecenas eget condimentum velit.',
		email: 'k.krol@nextlevelenergy.pl',
		phone: '+48 123 456 789',
		linkedin: '#',
		stats: { ovr: 99, pac: 95, sho: 97, pas: 99, dri: 98, def: 90, phy: 90 }
	},
	{
		id: 'wlodzimierz',
		name: 'Włodzimierz Lemański',
		role: 'Dyrektor Operacyjny',
		imagePath: '../src/assets/team/Marcin.png',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.',
		email: 'w.lemanski@nextlevelenergy.pl',
		phone: '+48 123 456 789',
		linkedin: '#',
		stats: { ovr: 97, pac: 88, sho: 85, pas: 96, dri: 92, def: 95, phy: 85 }
	}
];

async function migrate() {
  console.log('Starting team migration...');
  for (const member of teamMembers) {
    console.log(`Processing: ${member.name}`);
    
    // Upload image
    const filePath = path.join(__dirname, member.imagePath);
    let imageAsset;
    try {
      const imageBuffer = fs.readFileSync(filePath);
      imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: path.basename(filePath),
      });
      console.log(`Image uploaded: ${imageAsset._id}`);
    } catch (err) {
      console.error(`Failed to upload image for ${member.name}:`, err);
      continue;
    }

    // Create document
    const doc = {
      _type: 'founder',
      name: member.name,
      role: member.role,
      description: member.desc,
      email: member.email,
      phone: member.phone,
      linkedin: member.linkedin,
      stats: member.stats,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      // You can also consider setting a custom id or sanity document id mapping, but letting sanity generate the ID is fine here.
    };

    try {
      const res = await client.create(doc);
      console.log(`Team member document created with ID: ${res._id}`);
    } catch (err) {
      console.error(`Failed to create team member document for ${member.name}:`, err);
    }
  }
  console.log('Team Migration complete!');
}

migrate();
