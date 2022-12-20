using KHost.Common.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.SongImporters
{
    public class LocalSongImporter : ISongImporter
    {
        public string Name => "local";

        private static readonly string[] _knownExtensions = new[]
        {
            ".mp3",
            ".zip",
            ".mp4",
        };

        private static readonly string[] _tagLibSupportedExtensions = TagLib.SupportedMimeType.AllExtensions.ToArray();

        public async Task<IEnumerable<ImportableSong>> Find(string path)
        {
            var importableSongs = new List<ImportableSong>();

            importableSongs.AddRange(await FindImportableSongsAsync(path));

            return importableSongs;
        }

        public async Task<ImportableSong> GetDetails(string path)
        {
            var importableSong = await GenerateImportableSongAsync(path) ?? throw new Exception("Not a valid karaoke file");

            importableSong.Populated = true;

            using var tagFile = TagLib.File.Create(path);

            importableSong.Name = GetSongTitle(tagFile);

            importableSong.BandName = GetBandName(tagFile);

            importableSong.LengthInSeconds = (int)tagFile.Properties.Duration.TotalSeconds;

            return importableSong;
        }

        public Task<Song> Import(string path)
        {
            throw new NotImplementedException();
        }

        private async Task<IEnumerable<ImportableSong>> FindImportableSongsAsync(string path)
        {            
            var generateImportableSongTasks = new List<Task<ImportableSong?>>();

            var files = Directory.GetFiles(path);

            foreach (var file in files)
            {
                generateImportableSongTasks.Add(GenerateImportableSongAsync(file));
            }

            var importableSongs = (await Task.WhenAll(generateImportableSongTasks)).Where(s => s != null).Select(s => s!).ToList();

            var subDirectories = Directory.GetDirectories(path);

            var subDirectoryTasks = new List<Task<IEnumerable<ImportableSong>>>();

            foreach (var subDirectory in subDirectories)
            {
                subDirectoryTasks.Add(FindImportableSongsAsync(subDirectory));
            }

            foreach(var subImportableSongs in await Task.WhenAll(subDirectoryTasks))
            {
                importableSongs.AddRange(subImportableSongs);
            }

            return importableSongs;
        }

        private static async Task<ImportableSong?> GenerateImportableSongAsync(string path)
        {
            var fileInfo = new FileInfo(path);

            if (!await IsValidKaraokeFile(fileInfo)) return null;

            var importableSong = new ImportableSong
            {
                LocalPath = fileInfo.FullName,
                State = SongState.Ready,
                Source = "local"
            };

            if (string.IsNullOrWhiteSpace(importableSong.Name))
                importableSong.Name = fileInfo.Name[..^4];

            return importableSong;
        }

        private static string GetSongTitle(TagLib.File tagFile)
        {
            if (!string.IsNullOrWhiteSpace(tagFile.Tag.Title)) return tagFile.Tag.Title;

            return "";
        }

        private static string GetBandName(TagLib.File tagFile)
        {
            if (!string.IsNullOrWhiteSpace(tagFile.Tag.JoinedAlbumArtists)) return tagFile.Tag.JoinedAlbumArtists;

            if (!string.IsNullOrWhiteSpace(tagFile.Tag.JoinedPerformers)) return tagFile.Tag.JoinedPerformers;

            // JoinedArtists is depricated, but field related to it is still used...
#pragma warning disable CS0618
            if (!string.IsNullOrWhiteSpace(tagFile.Tag.JoinedArtists)) return tagFile.Tag.JoinedArtists;
#pragma warning restore CS0618

            return "";
        }

        private static async Task<bool> IsValidKaraokeFile(FileInfo fileInfo)
        {
            var extension = fileInfo.Extension.ToLowerInvariant();

            if (!_knownExtensions.Contains(extension)) return false;

            if (extension == ".zip" && !await IsCompressedCdgAsync(fileInfo.FullName)) return false;

            if (extension == ".mp3" && !await IsMp3WithCdgAsync(fileInfo)) return false;

            return true;
        }

        private static Task<bool> IsMp3WithCdgAsync(FileInfo fileInfo) => Task.Run(() =>
        {
            var cdgPath = fileInfo.FullName[..^fileInfo.Extension.Length] + ".cdg";

            return File.Exists(cdgPath);
        });

        private static Task<bool> IsCompressedCdgAsync(string path) => Task.Run(() =>
        {
            using var archive = ZipFile.Open(path, ZipArchiveMode.Read);

            string? cdgFileName = archive.Entries.FirstOrDefault(e => !string.IsNullOrWhiteSpace(e.Name) && e.Name[^4..] == ".cdg")?.Name[..^4];

            if (cdgFileName == null) return false;

            return archive.Entries.FirstOrDefault(e => e.Name == cdgFileName + ".mp3") != null;
        });
    }
}
