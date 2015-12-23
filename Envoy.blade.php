@servers(['web' => 'aws-auxe'])

<?php 
  $repo        = 'ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/lnppd_repo';
  $release_dir = '/home/ubuntu/www/lnppd.com/releases';
  $app_dir     = '/home/ubuntu/www/lnppd.com/public_html';
  $release     = 'release_' . date('YmdHis');
?>

@macro('deploy', ['on' => 'web'])
    fetch_repo
    update_permissions
    update_symlinks
@endmacro

@task('fetch_repo')
    [ -d {{ $release_dir }} ] || mkdir {{ $release_dir }};
    cd {{ $release_dir }};
    git clone {{ $repo }} {{ $release }};
@endtask

@task('run_composer')
    cd {{ $release_dir }}/{{ $release }};
    composer install --prefer-dist;
@endtask

@task('update_permissions')
    cd {{ $release_dir }};
    chgrp -R www-data {{ $release }};
    chmod -R ug+rwx {{ $release }};
@endtask

@task('update_symlinks')
    ln -nfs {{ $release_dir }}/{{ $release }} {{ $app_dir }};
    chgrp -h www-data {{ $app_dir }};
@endtask

