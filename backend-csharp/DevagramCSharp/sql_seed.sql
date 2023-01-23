-- SQLite
/*
INSERT INTO Usuarios (Id, Nome, Email, Senha, FotoPerfil)
VALUES (null,'Billy','billy@billy.com','billy','https://raw.githubusercontent.com/d1av/instagram-angular-csharp/main/frontend-angular/src/assets/images/avatar.svg');

INSERT INTO Usuarios (Id, Nome, Email, Senha, FotoPerfil)
VALUES (null,'Davi Alves','davi@davi.com','davi','https://raw.githubusercontent.com/d1av/instagram-angular-csharp/main/frontend-angular/src/assets/images/avatar.svg');
*/



INSERT INTO Seguidores (Id, IdUsuarioSeguidor, IdUsuarioSeguido)
VALUES (null,1,2),(null,2,1);


INSERT INTO Publicacoes (Id, Descricao, Foto, IdUsuario)
VALUES (NULL,'Projeto Devaria é muito bom! recomendo a todos que olhem.','https://cdn.cosmicjs.com/8f067730-646a-11ed-a788-57532a78de9b-81663652.jpg',1);


INSERT INTO Publicacoes (Id, Descricao, Foto, IdUsuario)
VALUES (NULL,'Eu de terno!','https://cdn.cosmicjs.com/9d864860-5fc6-11ed-b287-bd0c21104169-therock.jpg,1');

INSERT INTO Publicacoes (Id, Descricao, Foto, IdUsuario)
VALUES (NULL,'Eu no dia que recebi o prêmio!','https://cdn.cosmicjs.com/c9599cd0-5fc6-11ed-b287-bd0c21104169-therock1.jpg',2);

INSERT INTO Publicacoes (Id, Descricao, Foto, IdUsuario)
VALUES (NULL,'Eu com camiseta verde!','https://cdn.cosmicjs.com/3bfba220-5fcb-11ed-ae20-6d4f81acb181-images.jpg',2);

INSERT INTO Curtidas (Id, IdUsuario, IdPublicacao)
VALUES (null,1,1),(null,1,2),(null,1,3),(null,1,4),(null,2,1),(null,2,2),(null,2,3),(null,2,4);

INSERT INTO Comentarios (Id, Descricao, IdUsuario, IdPublicacao)
VALUES (null,'cor bonita!',1,1);

INSERT INTO Comentarios (Id, Descricao, IdUsuario, IdPublicacao)
VALUES (null,'Nova camiseta, e jogando muito',1,2);

INSERT INTO Comentarios (Id, Descricao, IdUsuario, IdPublicacao)
VALUES (null,'Correndo pro abraço!',2,3);

INSERT INTO Comentarios (Id, Descricao, IdUsuario, IdPublicacao)
VALUES (null,'Esse dia foi muito legal.',2,4);







/*
DELETE FROM Usuarios;


UPDATE SQLITE_SEQUENCE SET SEQ=0;

*/