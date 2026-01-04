import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2ZnFmYmNkZHZ1cWpmbWp1aW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MjY0MTAsImV4cCI6MjA4MzAwMjQxMH0.B2BOuTx-PdT2LCtdOndbF4EoY-KPE4XMYnNHz4ZQUOo'

const supabaseUrl = 'https://jvfqfbcddvuqjfmjuimi.supabase.co'

// Create a connection to Supabase
const supabase = createClient(supabaseUrl, anon_key)


export default function mediaUpload(file) {

    // Create a unique filename by adding timestamp to avoid duplicate names
    const timeStamp = new Date().getTime();
    const fileName = timeStamp + '-' + file.name;

    // Upload the file to the 'images' storage bucket
    supabase.storage.from('images').upload(fileName, file, {
        cacheControl: '3600',  // Cache file for 1 hour
        upsert: false,         // Don't overwrite if file already exists
    }).then((response) => {
        // Check if upload failed
        if (response.error) {
            console.error('Upload error:', response.error);
            return;
        }

        // Get the public URL where the file can be accessed
        const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;

        // Show the success message with the URL
        console.log('File uploaded successfully:', publicUrl);
    }).catch((error) => {
        // Handle any unexpected errors
        console.error('Error uploading file:', error.message);
    });
}