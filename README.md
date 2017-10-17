# Autorrent

Auto downloading of torrent files.


## Install

```
yarn install
```

## Configuration

- `.env` file with `SEEDBOX`, `USERNAME`, `PASSWORD`
- `db.json` file :
  - `tvShows` : list of tv shows to follow
  - `resolutions` : torrent resolutions i.e 720p, 1080p

## Run

```
yarn start
```

## Add tv show

```
yarn run add
```

## Remove tv show

```
yarn run remove
```

## Search an episode/season

- To generate the tv show list you need to run the following command once :

```
yarn run updateList
```

- Search

```
yarn run search
```
