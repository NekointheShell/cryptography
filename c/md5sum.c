#include <stdio.h>
#include <openssl/md5.h>


int main(int argc, char **argv) {
    FILE file = fopen(argv[1], 'r');

    fseek(file, 0, SEEK_END);
    long filesize = ftell(file);
    fseek(file, 0, 0);

    char *contents = malloc(filesize + 1);
    fread(contents, filesize, 1, file);
    fclose(file);

    char *digest = MD5(&contents);
    printf("%s", digest);

    return 0;
}
