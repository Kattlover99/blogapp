﻿// <auto-generated />
using System;
using DevagramCSharp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DevagramCSharp.Migrations
{
    [DbContext(typeof(DevagramContext))]
    [Migration("20230106054835_InitialOne")]
    partial class InitialOne
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("DevagramCSharp.Models.Comentario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("IdPublicacao")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdPublicacao");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Comentarios");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Curtida", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("IdPublicacao")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdPublicacao");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Curtidas");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Publicacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Foto")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Publicacoes");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Seguidor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("IdUsuarioSeguido")
                        .HasColumnType("int");

                    b.Property<int?>("IdUsuarioSeguidor")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuarioSeguido");

                    b.HasIndex("IdUsuarioSeguidor");

                    b.ToTable("Seguidores");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FotoPerfil")
                        .HasColumnType("longtext");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Comentario", b =>
                {
                    b.HasOne("DevagramCSharp.Models.Publicacao", "Publicacao")
                        .WithMany()
                        .HasForeignKey("IdPublicacao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DevagramCSharp.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Publicacao");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Curtida", b =>
                {
                    b.HasOne("DevagramCSharp.Models.Publicacao", "Publicacao")
                        .WithMany()
                        .HasForeignKey("IdPublicacao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DevagramCSharp.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Publicacao");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Publicacao", b =>
                {
                    b.HasOne("DevagramCSharp.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("DevagramCSharp.Models.Seguidor", b =>
                {
                    b.HasOne("DevagramCSharp.Models.Usuario", "UsuarioSeguido")
                        .WithMany()
                        .HasForeignKey("IdUsuarioSeguido");

                    b.HasOne("DevagramCSharp.Models.Usuario", "UsuarioSeguidor")
                        .WithMany()
                        .HasForeignKey("IdUsuarioSeguidor");

                    b.Navigation("UsuarioSeguido");

                    b.Navigation("UsuarioSeguidor");
                });
#pragma warning restore 612, 618
        }
    }
}
